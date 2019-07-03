/**
 *
 * AvailableFunds
 *
 */

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from 'containers/DashboardPage/saga';
import { PRIMARY_BLUE_LIGHT } from 'utils/colors';
import reducer from 'containers/DashboardPage/reducer';
import {
  makeAvailableFundsSelector,
  makeAccountBalanceHistorySelector,
  makeCurrencySelector,
} from 'containers/DashboardPage/selectors';
import {
  getAvailableFundsAction,
  getAccountBalanceHistoryAction,
  getCurrencyAction,
} from 'containers/DashboardPage/actions';
import { makeUserIdSelector } from 'containers/App/selectors';

// Import Components
import {
  HeavyWidgetWrapper,
  HeavyWidgetHeader,
  HeavyWidgetUnit,
  HeavyWidgetMain,
  HeavyWidgetJoin,
  HeavyWidgetLeftSide,
  HeavyWidgetRightSide,
} from 'components/App/HeavyWidget';
import LoadingCircular from 'components/App/LoadingCircular';
import Trend from 'react-trend';
import LoadingWrapper from './LoadingWrapper';
import messages from './messages';

function AvailableFunds({
  availableFunds,
  accountBalanceHistory,
  currency,
  getAvailableFunds,
  getAccountBalanceHistory,
  getCurrency,
}) {
  useInjectSaga({ key: 'dashboardPage', saga });
  useInjectReducer({ key: 'dashboardPage', reducer });
  useEffect(() => {
    if (!availableFunds) getAvailableFunds();
    if (!currency) getCurrency();
    if (accountBalanceHistory.length === 0) getAccountBalanceHistory();
  }, []);

  return (
    <HeavyWidgetWrapper>
      {availableFunds && currency && accountBalanceHistory.length ? (
        <Fragment>
          <HeavyWidgetLeftSide>
            <HeavyWidgetHeader>
              <FormattedMessage {...messages.availableFunds} />
            </HeavyWidgetHeader>
            <HeavyWidgetJoin>
              <HeavyWidgetMain>{availableFunds}</HeavyWidgetMain>{' '}
              <HeavyWidgetUnit>{currency}</HeavyWidgetUnit>
            </HeavyWidgetJoin>
          </HeavyWidgetLeftSide>
          <HeavyWidgetRightSide>
            <Trend
              width={115}
              height={40}
              smooth
              autoDraw
              autoDrawDuration={1500}
              autoDrawEasing="ease-out"
              data={accountBalanceHistory}
              gradient={[`${PRIMARY_BLUE_LIGHT}`]}
              radius={0}
              strokeWidth={2.5}
              strokeLinecap="square"
            />
          </HeavyWidgetRightSide>
        </Fragment>
      ) : (
        <LoadingWrapper>
          <LoadingCircular />
        </LoadingWrapper>
      )}
    </HeavyWidgetWrapper>
  );
}

AvailableFunds.propTypes = {
  availableFunds: PropTypes.string,
  accountBalanceHistory: PropTypes.array,
  currency: PropTypes.string,
  getAvailableFunds: PropTypes.func,
  getAccountBalanceHistory: PropTypes.func,
  getCurrency: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  availableFunds: makeAvailableFundsSelector(),
  accountBalanceHistory: makeAccountBalanceHistorySelector(),
  currency: makeCurrencySelector(),
  userId: makeUserIdSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAvailableFunds: () => dispatch(getAvailableFundsAction()),
    getAccountBalanceHistory: () => dispatch(getAccountBalanceHistoryAction()),
    getCurrency: () => dispatch(getCurrencyAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AvailableFunds);
