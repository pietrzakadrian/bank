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
import HeavyWidgetWrapper from 'components/App/HeavyWidget/HeavyWidgetWrapper';
import HeavyWidgetHeader from 'components/App/HeavyWidget/HeavyWidgetHeader';
import HeavyWidgetMain from 'components/App/HeavyWidget/HeavyWidgetMain';
import HeavyWidgetUnit from 'components/App/HeavyWidget/HeavyWidgetUnit';
import HeavyWidgetJoin from 'components/App/HeavyWidget/HeavyWidgetJoin';
import HeavyWidgetLeftSide from 'components/App/HeavyWidget/HeavyWidgetLeftSide';
import HeavyWidgetRightSide from 'components/App/HeavyWidget/HeavyWidgetRightSide';
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
import Trend from 'react-trend';
import { makeUserIdSelector } from 'containers/App/selectors';
import messages from './messages';
import LoadingWrapper from './LoadingWrapper';
import LoadingCircular from '../LoadingCircular';

function AvailableFunds({
  availableFunds,
  accountBalanceHistory,
  currency,
  userId,
  getAvailableFunds,
  getAccountBalanceHistory,
  getCurrency,
}) {
  useInjectSaga({ key: 'dashboardPage', saga });
  useInjectReducer({ key: 'dashboardPage', reducer });
  useEffect(() => {
    getAvailableFunds();
    getAccountBalanceHistory();
    getCurrency();
  }, []);

  return (
    <HeavyWidgetWrapper>
      {availableFunds && currency && accountBalanceHistory ? (
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
