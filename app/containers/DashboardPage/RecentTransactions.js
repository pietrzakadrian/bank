import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import socketIOClient from 'socket.io-client';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

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
import messages from './messages';
import {
  makeRecentTransactionsRecipientSelector,
  makeRecentTransactionsSenderSelector,
} from './selectors';
import {
  getRecentTransactionsRecipientAction,
  getRecentTransactionsSenderAction,
} from './actions';
import { makeUserIdSelector } from '../App/selectors';

// Import Styles
const styles = () => ({
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
  tableCellRight: {
    textAlign: 'right',
  },
  loadingCircular: {
    display: 'flex',
    height: 193,
    flexDirection: 'row',
  },
  outgoingTransfer: {
    color: '#ea0000',
  },
  recipientName: {
    color: '#0029ab',
  },
  senderName: {
    color: '#0029ab',
  },
});

class RecentTransactions extends Component {
  componentDidMount() {
    this.props.recentTransactionsRecipient &&
    this.props.recentTransactionsSender
      ? null
      : this.props.getRecentTransactionsData();
  }

  sortingData = data =>
    data.sort((a, b) => Date.parse(b.date_time) - Date.parse(a.date_time));

  render() {
    const {
      classes,
      recentTransactionsRecipient,
      recentTransactionsSender,
      userId,
    } = this.props;
    const socket = socketIOClient('/');

    try {
      socket.on('new notification', id => {
        id === this.props.userId
          ? this.props.getRecentTransactionsData()
          : null;
      });
    } catch (e) {
      /* just ignore */
    }

    return (
      <Card className={classes.card}>
        <CardContent className={classes.root}>
          <Typography
            component="h2"
            variant="h6"
            className={classes.typographyTitle}
          >
            <FormattedMessage {...messages.recentTransactions} />
          </Typography>

          {recentTransactionsRecipient && recentTransactionsSender && userId ? (
            <Table className={classes.table}>
              <TableBody>
                {this.sortingData([
                  ...recentTransactionsRecipient,
                  ...recentTransactionsSender,
                ]).map((row, id) => (
                  <TableRow key={id++}>
                    {row.id_sender === userId ? (
                      <Fragment>
                        <TableCell className={classes.tableCell} scope="row">
                          <FormattedMessage {...messages.toPayment} />{' '}
                          <span className={classes.recipientName}>
                            {row.getRecipientdata.name}{' '}
                            {row.getRecipientdata.surname}
                          </span>
                          <br />
                          {row.transfer_title}
                        </TableCell>
                        <TableCell className={classes.tableCellRight}>
                          {moment(row.date_time).format('DD.MM.YYYY')}
                          <br />
                          <span className={classes.outgoingTransfer}>
                            -
                            {row.amount_money
                              .toFixed(2)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                              .replace('.', ',')}{' '}
                            <FormattedMessage {...messages.currency} />
                          </span>
                        </TableCell>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <TableCell className={classes.tableCell} scope="row">
                          <FormattedMessage {...messages.fromPayment} />{' '}
                          <span className={classes.senderName}>
                            {row.getSenderdata.name} {row.getSenderdata.surname}
                          </span>
                          <br />
                          {row.transfer_title}
                        </TableCell>
                        <TableCell className={classes.tableCellRight}>
                          {moment(row.date_time).format('DD.MM.YYYY')}
                          <br />
                          {row.amount_money
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                            .replace('.', ',')}{' '}
                          <FormattedMessage {...messages.currency} />
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

const mapStateToProps = createStructuredSelector({
  recentTransactionsRecipient: makeRecentTransactionsRecipientSelector(),
  recentTransactionsSender: makeRecentTransactionsSenderSelector(),
  userId: makeUserIdSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRecentTransactionsData: () => {
      dispatch(getRecentTransactionsRecipientAction()) &&
        dispatch(getRecentTransactionsSenderAction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  withConnect,
)(RecentTransactions);
