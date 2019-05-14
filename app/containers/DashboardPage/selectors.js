import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboardPage state domain
 */

const selectDashboardPageDomain = state =>
  state.get('dashboardPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by DashboardPage
 */

const makeNameSelector = () =>
  createSelector(selectDashboardPageDomain, substate => substate.get('name'));

const makeSurnameSelector = () =>
  createSelector(selectDashboardPageDomain, substate =>
    substate.get('surname'),
  );

const makeEmailSelector = () =>
  createSelector(selectDashboardPageDomain, substate => substate.get('email'));

const makeLastPresentLoggedSelector = () =>
  createSelector(selectDashboardPageDomain, substate =>
    substate.get('lastPresentLogged'),
  );

const makeLastSuccessfulLoggedSelector = () =>
  createSelector(selectDashboardPageDomain, substate =>
    substate.get('lastSuccessfulLogged'),
  );

const makeAvailableFundsSelector = () =>
  createSelector(selectDashboardPageDomain, substate =>
    substate.get('availableFunds'),
  );

const makeAccountBillsSelector = () =>
  createSelector(selectDashboardPageDomain, substate =>
    substate.get('accountBills'),
  );

const makeAccountBalanceHistorySelector = () =>
  createSelector(selectDashboardPageDomain, substate =>
    substate.get('accountBalanceHistory'),
  );

const makeRecentTransactionsSenderSelector = () =>
  createSelector(selectDashboardPageDomain, substate =>
    substate.get('recentTransactionsSender'),
  );

const makeRecentTransactionsRecipientSelector = () =>
  createSelector(selectDashboardPageDomain, substate =>
    substate.get('recentTransactionsRecipient'),
  );

const makeOutgoingTransfersSumSelector = () =>
  createSelector(selectDashboardPageDomain, substate =>
    substate.get('outgoingTransfersSum'),
  );

const makeIncomingTransfersSumSelector = () =>
  createSelector(selectDashboardPageDomain, substate =>
    substate.get('incomingTransfersSum'),
  );

const makeErrorSelector = () =>
  createSelector(selectDashboardPageDomain, substate => substate.get('error'));

const makeCurrencySelector = () =>
  createSelector(selectDashboardPageDomain, substate =>
    substate.get('currency'),
  );

const makeSelectDashboardPage = () =>
  createSelector(selectDashboardPageDomain, substate => substate.toJS());

export default makeSelectDashboardPage;
export {
  makeNameSelector,
  makeSurnameSelector,
  makeLastPresentLoggedSelector,
  makeLastSuccessfulLoggedSelector,
  makeAvailableFundsSelector,
  makeAccountBillsSelector,
  makeAccountBalanceHistorySelector,
  makeRecentTransactionsSenderSelector,
  makeRecentTransactionsRecipientSelector,
  makeErrorSelector,
  makeOutgoingTransfersSumSelector,
  makeIncomingTransfersSumSelector,
  makeEmailSelector,
  makeCurrencySelector,
};
