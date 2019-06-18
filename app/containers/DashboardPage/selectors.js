import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboardPage state domain
 */

const selectDashboardPageDomain = state => state.dashboardPage || initialState;

/**
 * Other specific selectors
 */

const makeNameSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.name,
  );

const makeSurnameSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.surname,
  );

const makeEmailSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.email,
  );

const makeLastPresentLoggedSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.lastPresentLogged,
  );

const makeLastSuccessfulLoggedSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.lastSuccessfulLogged,
  );

const makeLastFailedLoggedSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.lastFailedLogged,
  );

const makeAvailableFundsSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.availableFunds,
  );

const makeAccountBillsSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.accountBills,
  );

const makeAccountBalanceHistorySelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.accountBalanceHistory,
  );

const makeSavingsSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.savings,
  );

const makeRecentTransactionsSenderSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.recentTransactionsSender,
  );

const makeRecentTransactionsRecipientSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.recentTransactionsRecipient,
  );

const makeOutgoingTransfersSumSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.outgoingTransfersSum,
  );

const makeIncomingTransfersSumSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.incomingTransfersSum,
  );

const makeCurrencySelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.currency,
  );

const makeErrorSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.error,
  );

const makeRechartsProcentSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.rechartsProcent,
  );

const makeRechartsColorsSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.rechartsColors,
  );

const makeRechartsDataSelector = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.rechartsData,
  );

/**
 * Default selector used by DashboardPage
 */

const makeSelectDashboardPage = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate,
  );

export default makeSelectDashboardPage;
export {
  makeNameSelector,
  makeSurnameSelector,
  makeEmailSelector,
  makeLastPresentLoggedSelector,
  makeLastSuccessfulLoggedSelector,
  makeLastFailedLoggedSelector,
  makeAvailableFundsSelector,
  makeAccountBillsSelector,
  makeAccountBalanceHistorySelector,
  makeSavingsSelector,
  makeRecentTransactionsSenderSelector,
  makeRecentTransactionsRecipientSelector,
  makeOutgoingTransfersSumSelector,
  makeIncomingTransfersSumSelector,
  makeCurrencySelector,
  makeRechartsProcentSelector,
  makeRechartsColorsSelector,
  makeRechartsDataSelector,
  makeErrorSelector,
};
