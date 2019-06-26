import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the paymentPage state domain
 */

const selectPaymentPageDomain = state => state.paymentPage || initialState;

/**
 * Other specific selectors
 */

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
  makeActiveStepSelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makeSuggestionsSelector,
};
