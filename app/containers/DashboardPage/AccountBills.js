/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

// Import Material-UI
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import SwapVertIcon from '@material-ui/icons/SwapVert';

// Import Components
import { FormattedMessage } from 'react-intl';
import Loading from '../../components/App/Loading';

// Import Internationalize
import messages from './messages';
import AuthService from '../../services/AuthService';

// Import Styles
const styles = theme => ({
  root: {
    padding: 0,
  },
  card: {
    height: 245,
    borderRadius: 0,
  },
  typographyTitle: {
    backgroundColor: '#f7f7f7',
    padding: '10px 25px',
    position: 'relative',
  },
  cardAction: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
  },
  tableCell: {
    fontSize: theme.spacing.unit * 1.8,
  },
  tableCellRight: {
    fontSize: theme.spacing.unit * 1.8,
    textAlign: 'right',
  },
  loadingCircular: {
    display: 'flex',
    height: 193,
    flexDirection: 'row',
  },
  availabeFundsContainer: {
    fontWeight: 600,
  },
  swapVertIcon: {
    position: 'relative',
    top: -1,
  },
  buttonText: {
    color: '#15a0dd',
  },
  button: {
    textTransform: 'none',
    lineHeight: 2,
  },
});

class AccountBills extends Component {
  constructor() {
    super();
    this.state = {
      accountBills: '',
      isLoading: false,
      endpoint: 'http://localhost:3000',
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.Auth.accountBills(this.props.id)
      .then(res => {
        if (res) {
          this.setState({
            isLoading: true,
            accountBills: res,
          });
        }
      })
      .catch(() => {
        /* just ignore */
      });
  }

  render() {
    const { classes } = this.props;
    const { accountBills, isLoading } = this.state;
    const socket = socketIOClient(`${this.state.endpoint}`);

    socket.on('new notification', id => {
      if (id === this.props.id) {
        this.setState(
          {
            isLoading: false,
          },
          () => {
            this.Auth.accountBills(this.props.id)
              .then(res => {
                if (res) {
                  this.setState({
                    isLoading: true,
                    accountBills: res,
                  });
                }
              })
              .catch(() => {
                /* just ignore */
              });
          },
        );
      }
    });

    return (
      <Card className={classes.card}>
        <CardContent className={classes.root}>
          <Typography
            component="h2"
            variant="h6"
            className={classes.typographyTitle}
          >
            <FormattedMessage {...messages.bills} />
            <CardActions className={classes.cardAction}>
              <Button
                size="small"
                classes={{
                  root: classes.button,
                }}
              >
                <span className={classes.buttonText}>
                  <SwapVertIcon className={classes.swapVertIcon} /> Nowa
                  płatność
                </span>
              </Button>
            </CardActions>
          </Typography>
          <Table>
            <TableBody>
              {isLoading ? (
                accountBills.map((accountBill, id) => (
                  <TableRow key={id++}>
                    <TableCell className={classes.tableCell} scope="row">
                      <span>
                        {accountBill.account_bill
                          .toString()
                          .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
                          .trim()}
                      </span>
                    </TableCell>
                    <TableCell className={classes.tableCellRight}>
                      <span className={classes.availabeFundsContainer}>
                        {accountBill.available_funds
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                          .replace('.', ',')}
                      </span>{' '}
                      PLN
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>
                    <div className={classes.loadingCircular}>
                      <Loading />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
}

AccountBills.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountBills);
