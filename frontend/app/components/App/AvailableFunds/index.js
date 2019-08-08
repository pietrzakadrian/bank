/**
 *
 * AvailableFunds
 *
 */

import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/DashboardPage/reducer';
import saga from 'containers/DashboardPage/saga';

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

// Import Utils
import { PRIMARY_BLUE_LIGHT } from 'utils/colors';
import ApiEndpoint from 'utils/api.js';
import AuthService from 'services/auth.service';

// Import Actions
import {
  getAvailableFundsAction,
  getAccountBalanceHistoryAction,
  getCurrencyAction,
} from 'containers/DashboardPage/actions';

// Import Selectors
import {
  makeAvailableFundsSelector,
  makeAccountBalanceHistorySelector,
  makeCurrencySelector,
} from 'containers/DashboardPage/selectors';

const stateSelector = createStructuredSelector({
  availableFunds: makeAvailableFundsSelector(),
  accountBalanceHistory: makeAccountBalanceHistorySelector(),
  currency: makeCurrencySelector(),
});

export default function AvailableFunds() {
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const key = 'dashboardPage';
  const dispatch = useDispatch();
  const getAvailableFunds = () => dispatch(getAvailableFundsAction());
  const getAccountBalanceHistory = () =>
    dispatch(getAccountBalanceHistoryAction());
  const getCurrency = () => dispatch(getCurrencyAction());
  const { availableFunds, accountBalanceHistory, currency } = useSelector(
    stateSelector,
  );

  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

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
