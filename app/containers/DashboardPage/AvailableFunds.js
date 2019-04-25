/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Import Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Trend from 'react-trend';

// Import Components
import LoadingCircular from 'components/App/LoadingCircular';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import {
  getAvailableFundsAction,
  getAccountBalanceHistoryAction,
  getCurrencyAction,
} from './actions';
import {
  makeAvailableFundsSelector,
  makeAccountBalanceHistorySelector,
  makeCurrencySelector,
} from './selectors';
import { makeUserIdSelector } from '../App/selectors';

// Import Styles
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: 95,
    boxShadow: 'none',
    border: '1.3px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 0,
    backgroundColor: '#f3f3f3',
    position: 'relative',
  },
  typographyMain: {
    display: 'inline-block',
  },
  loadingCircular: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
  },
  trendContainer: {
    position: 'absolute',
    right: 20,
    top: 23.5,
  },
  typographyText: {
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.33,
  },
  h6: {
    fontFamily: 'Lato',
  },
});

class AvailableFunds extends Component {
  componentDidMount() {
    this.props.availableFunds && this.props.accountBalanceHistory
      ? null
      : this.props.getUserdata();
  }

  render() {
    const {
      classes,
      availableFunds,
      accountBalanceHistory,
      currency,
    } = this.props;
    const accountBalanceHistoryArray = JSON.parse(`[${accountBalanceHistory}]`);
    const socket = socketIOClient('/');

    try {
      socket.on('new notification', id => {
        id === this.props.userId ? this.props.getUserdata() : null;
      });
    } catch (e) {
      /* just ignore */
    }

    return (
      <Paper className={classes.root} elevation={1}>
        {(availableFunds || availableFunds === 0) &&
        accountBalanceHistory &&
        currency ? (
            <Fragment>
              <div>
                <Typography variant="subtitle1">
                  <FormattedMessage {...messages.availableFunds} />
                </Typography>
                <span className={classes.typographyText}>
                  {availableFunds
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                    .replace('.', ',')}
                &nbsp;
                  <Typography
                    variant="subtitle1"
                    className={classes.typographyMain}
                  >
                    {currency}
                  </Typography>
                </span>
                <Trend
                  className={classNames(
                    classes.trendContainer,
                    'trend--container',
                  )}
                  width={115}
                  height={40}
                  smooth
                  autoDraw
                  autoDrawDuration={1500}
                  autoDrawEasing="ease-out"
                  data={accountBalanceHistoryArray}
                  gradient={['#15a0dd']}
                  radius={0}
                  strokeWidth={2.5}
                  strokeLinecap="square"
                />
              </div>
            </Fragment>
          ) : (
            <div className={classes.loadingCircular}>
              <LoadingCircular />
            </div>
          )}
      </Paper>
    );
  }
}

AvailableFunds.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  availableFunds: makeAvailableFundsSelector(),
  accountBalanceHistory: makeAccountBalanceHistorySelector(),
  currency: makeCurrencySelector(),
  userId: makeUserIdSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserdata: () => {
      dispatch(getAvailableFundsAction()) &&
        dispatch(getAccountBalanceHistoryAction()) &&
        dispatch(getCurrencyAction());
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
)(AvailableFunds);
