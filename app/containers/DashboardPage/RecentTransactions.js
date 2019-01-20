import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Import Material-UI
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

// Import Components
import Loading from 'components/App/Loading';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import AuthService from '../../services/AuthService';
import messages from './messages';

// Import Styles
const styles = theme => ({
  root: {
    padding: 0,
  },
  card: {
    height: 245,
    borderRadius: 0,
    boxShadow: 'none',
    border: '1.3px solid rgba(0, 0, 0, 0.12)',
  },
  typographyTitle: {
    padding: '10px 25px',
    position: 'relative',
  },
  tableCell: {
    padding: '4px 0px 4px 28px',
  },
  loadingCircular: {
    display: 'flex',
    height: 193,
    flexDirection: 'row',
  },
  outgoingTransfer: {
    color: '#ea0000',
  },
});

const sortingData = data =>
  data.sort((a, b) => Date.parse(b.date_time) - Date.parse(a.date_time));

class RecentTransactions extends Component {
  constructor() {
    super();

    this.state = {
      recentTransactionsSender: [],
      recentTransactionsRecipient: [],
      isLoading: false,
    };
    this.Auth = new AuthService();
  }

  // test
  componentDidMount() {
    // ! TODO: add i18n http://momentjs.com/docs/#/i18n/
    this.Auth.recentTransactionsRecipient(this.props.id)
      .then(res => {
        if (res) {
          this.setState({
            isLoading: true,
            recentTransactionsRecipient: res,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.Auth.recentTransactionsSender(this.props.id)
      .then(res => {
        if (res) {
          this.setState({
            isLoading: true,
            recentTransactionsSender: res,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const {
      recentTransactionsRecipient,
      recentTransactionsSender,
      isLoading,
    } = this.state;

    const combinedData = [
      ...recentTransactionsRecipient,
      ...recentTransactionsSender,
    ];

    return (
      <Card className={classes.card}>
        <CardContent className={classes.root}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.typographyTitle}
          >
            <FormattedMessage {...messages.recentTransactions} />
          </Typography>

          {isLoading ? (
            <Table className={classes.table}>
              <TableBody>
                {sortingData(combinedData).map(row => (
                  <TableRow key={row.id}>
                    {row.id_sender === this.props.id ? (
                      <Fragment>
                        <TableCell
                          className={classes.tableCell}
                          component="th"
                          scope="row"
                        >
                          Dla {row.id_recipient}
                          <br />
                          {row.transfer_title}
                        </TableCell>
                        <TableCell className={classes.tableCell} numeric>
                          {moment(row.date_time).format('DD.MM.YYYY')}
                          <br />
                          <span className={classes.outgoingTransfer}>
                            -
                            {row.amount_money
                              .toFixed(2)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                              .replace('.', ',')}{' '}
                            PLN
                          </span>
                        </TableCell>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <TableCell
                          className={classes.tableCell}
                          component="th"
                          scope="row"
                        >
                          Od {row.id_sender}
                          <br />
                          {row.transfer_title}
                        </TableCell>
                        <TableCell className={classes.tableCell} numeric>
                          {moment(row.date_time).format('DD.MM.YYYY')}
                          <br />
                          {row.amount_money
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                            .replace('.', ',')}{' '}
                          PLN
                        </TableCell>
                      </Fragment>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className={classes.loadingCircular}>
              <Loading />
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}

RecentTransactions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecentTransactions);
