/* eslint-disable indent */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

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
import LoadingCircular from 'components/App/LoadingCircular';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import { makeUserIdSelector } from 'containers/App/selectors';
import messages from './messages';

import { getAccountBillsAction } from './actions';
import {
  makeAvailableFundsSelector,
  makeAccountBillsSelector,
  makeCurrencySelector,
} from './selectors';

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
    width: '35%',
    paddingLeft: 0,
  },
  loadingCircular: {
    display: 'flex',
    height: 193,
    flexDirection: 'row',
  },
  availabeFundsContainer: {
    fontWeight: 700,
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
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  accountBillContainer: {
    cursor: 'auto',
  },
  rootTableCell: {
    padding: '4px 24px 4px 24px',
  },
});

class AccountBills extends Component {
  componentDidMount() {
    this.props.availableFunds && this.props.accountBills
      ? null
      : this.props.getAccountBills();
  }

  componentDidUpdate() {
    this.props.availableFunds && this.props.accountBills
      ? null
      : this.props.getAccountBills();
  }

  render() {
    const { classes, availableFunds, accountBills, currency } = this.props;
    const socket = socketIOClient('/');

    try {
      socket.on('new notification', id => {
        id === this.props.userId ? this.props.getAccountBills() : null;
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
            <FormattedMessage {...messages.bills} />
            <CardActions className={classes.cardAction}>
              <NavLink to="/payment">
                <Button
                  size="small"
                  classes={{
                    root: classes.button,
                  }}
                >
                  <span className={classes.buttonText}>
                    <SwapVertIcon className={classes.swapVertIcon} />
                    <FormattedMessage {...messages.newPayment} />
                  </span>
                </Button>
              </NavLink>
            </CardActions>
          </Typography>
          <Table>
            <TableBody>
              {(availableFunds || availableFunds === 0) &&
              accountBills &&
              currency ? (
                <TableRow>
                  <TableCell
                    className={classes.tableCell}
                    classes={{ root: classes.rootTableCell }}
                    onMouseDown={e => e.stopPropagation()}
                    scope="row"
                  >
                    <span className={classes.accountBillContainer}>
                      {accountBills
                        .toString()
                        .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
                        .trim()}
                    </span>
                  </TableCell>
                  <TableCell
                    className={classes.tableCellRight}
                    classes={{ root: classes.rootTableCellCurrency }}
                  >
                    <span className={classes.availabeFundsContainer}>
                      {availableFunds
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                        .replace('.', ',')}
                    </span>{' '}
                    {currency}
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell>
                    <div className={classes.loadingCircular}>
                      <LoadingCircular />
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

const mapStateToProps = createStructuredSelector({
  availableFunds: makeAvailableFundsSelector(),
  accountBills: makeAccountBillsSelector(),
  currency: makeCurrencySelector(),
  userId: makeUserIdSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAccountBills: () => {
      dispatch(getAccountBillsAction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  withRouter,
  withConnect,
)(AccountBills);
