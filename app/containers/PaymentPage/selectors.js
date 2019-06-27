import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the paymentPage state domain
 */

const selectPaymentPageDomain = state => state.paymentPage || initialState;

/**
 * Other specific selectors
 */

const makeAmountMoneySelector = () =>
  createSelector(
    selectPaymentPageDomain,
    substate => substate.amountMoney,
  );

const makeTransferTitleSelector = () =>
  createSelector(
    selectPaymentPageDomain,
    substate => substate.transferTitle,
  );

const makeActiveStepSelector = () =>
  createSelector(
    selectPaymentPageDomain,
    substate => substate.activeStep,
  );

const makeIsLoadingSelector = () =>
  createSelector(
    selectPaymentPageDomain,
    substate => substate.isLoading,
  );

const makeErrorSelector = () =>
  createSelector(
    selectPaymentPageDomain,
    substate => substate.error,
  );

const makeSuggestionsSelector = () =>
  createSelector(
    selectPaymentPageDomain,
    substate => substate.suggestions,
  );

/**
 * Default selector used by PaymentPage
 */

const makeSelectPaymentPage = () =>
  createSelector(
    selectPaymentPageDomain,
    substate => substate,
  );

export default makeSelectPaymentPage;
export {
  makeAmountMoneySelector,
  makeTransferTitleSelector,
  makeActiveStepSelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makeSuggestionsSelector,
};
