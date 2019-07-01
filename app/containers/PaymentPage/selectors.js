import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the paymentPage state domain
 */

const selectPaymentPageDomain = state => state.paymentPage || initialState;

/**
 * Other specific selectors
 */

const makeAccountNumberSelector = () =>
  createSelector(
    selectPaymentPageDomain,
    substate => substate.accountNumber,
  );

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

const makeAuthorizationKeySelector = () =>
  createSelector(
    selectPaymentPageDomain,
    substate => substate.authorizationKey,
  );

const makeRecipientIdSelector = () =>
  createSelector(
    selectPaymentPageDomain,
    substate => substate.recipientId,
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

const makeIsSendAuthorizationKeySelector = () =>
  createSelector(
    selectPaymentPageDomain,
    substate => substate.isSendAuthorizationKey,
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
  makeAccountNumberSelector,
  makeAmountMoneySelector,
  makeTransferTitleSelector,
  makeAuthorizationKeySelector,
  makeRecipientIdSelector,
  makeActiveStepSelector,
  makeIsSendAuthorizationKeySelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makeSuggestionsSelector,
};
