import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the paymentPage state domain
 */

const selectPaymentPageDomain = state => state.get('paymentPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PaymentPage
 */

const makeSelectPaymentPage = () =>
  createSelector(selectPaymentPageDomain, substate => substate.toJS());

const makeAccountBillsSelector = () =>
  createSelector(selectPaymentPageDomain, substate =>
    substate.get('accountBills'),
  );

const makeAccountNumberSelector = () =>
  createSelector(selectPaymentPageDomain, substate =>
    substate.get('accountNumber'),
  );

const makeAmountMoneySelector = () =>
  createSelector(selectPaymentPageDomain, substate =>
    substate.get('amountMoney'),
  );

const makeTransferTitleSelector = () =>
  createSelector(selectPaymentPageDomain, substate =>
    substate.get('transferTitle'),
  );

const makeAuthorizationKeySelector = () =>
  createSelector(selectPaymentPageDomain, substate =>
    substate.get('authorizationKey'),
  );

const makeActiveStepSelector = () =>
  createSelector(selectPaymentPageDomain, substate =>
    substate.get('activeStep'),
  );

const makeIsLoadingSelector = () =>
  createSelector(selectPaymentPageDomain, substate =>
    substate.get('isLoading'),
  );

const makeMessageSelector = () =>
  createSelector(selectPaymentPageDomain, substate => substate.get('message'));

const makeErrorSelector = () =>
  createSelector(selectPaymentPageDomain, substate => substate.get('error'));

const makeIsAccountBillSelector = () =>
  createSelector(selectPaymentPageDomain, substate =>
    substate.get('isAccountBill'),
  );

const makeIsAmountMoneySelector = () =>
  createSelector(selectPaymentPageDomain, substate =>
    substate.get('isAmountMoney'),
  );

const makeValueSelector = () =>
  createSelector(selectPaymentPageDomain, substate => substate.get('value'));

const makeIsSendAuthorizationKeySelector = () =>
  createSelector(selectPaymentPageDomain, substate =>
    substate.get('isSendAuthorizationKey'),
  );

const makeRecipientIdSelector = () =>
  createSelector(selectPaymentPageDomain, substate =>
    substate.get('recipientId'),
  );

const makeSuggestionsSelector = () =>
  createSelector(selectPaymentPageDomain, substate =>
    substate.get('suggestions'),
  );

const makeCurrencySelector = () =>
  createSelector(selectPaymentPageDomain, substate => substate.get('currency'));

export default makeSelectPaymentPage;
export {
  makeAccountBillsSelector,
  makeAccountNumberSelector,
  makeAmountMoneySelector,
  makeTransferTitleSelector,
  makeAuthorizationKeySelector,
  makeActiveStepSelector,
  makeIsLoadingSelector,
  makeMessageSelector,
  makeErrorSelector,
  makeValueSelector,
  makeSuggestionsSelector,
  makeSelectPaymentPage,
  makeIsAccountBillSelector,
  makeIsAmountMoneySelector,
  makeIsSendAuthorizationKeySelector,
  makeRecipientIdSelector,
  makeCurrencySelector,
};
