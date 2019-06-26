import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the paymentPage state domain
 */

const selectPaymentPageDomain = state => state.paymentPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PaymentPage
 */

const makeSelectPaymentPage = () =>
  createSelector(
    selectPaymentPageDomain,
    substate => substate,
  );

export default makeSelectPaymentPage;
export { selectPaymentPageDomain };
