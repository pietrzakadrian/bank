import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

// Import Components
import Loading from 'components/App/Loading/';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
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
  loadingCircular: {
    display: 'flex',
    height: 193,
    flexDirection: 'row',
  },
  availabeFundsContainer: {
    fontWeight: 600,
  },
});

class AccountBills extends Component {
  constructor() {
    super();
    this.state = {
      accountBills: '',
      isLoading: false,
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
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { accountBills, isLoading } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.root}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.typographyTitle}
          >
            <FormattedMessage {...messages.bills} />
            <CardActions className={classes.cardAction}>
              <Button size="small">
                <FormattedMessage {...messages.makeTransferBtn} />
              </Button>
            </CardActions>
          </Typography>
          <Table>
            <TableBody>
              {isLoading ? (
                accountBills.map(accountBill => (
                  <TableRow>
                    <TableCell
                      className={classes.tableCell}
                      component="th"
                      scope="row"
                    >
                      {accountBill.account_bill
                        .toString()
                        .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
                        .trim()}
                    </TableCell>
                    <TableCell className={classes.tableCell} numeric>
                      <span className={classes.availabeFundsContainer}>
                        {accountBill.available_funds}
                      </span>{' '}
                      PLN
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <div className={classes.loadingCircular}>
                  <Loading />
                </div>
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
