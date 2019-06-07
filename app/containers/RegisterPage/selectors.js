import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registerPage state domain
 */

const selectRegisterPageDomain = state => state.registerPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RegisterPage
 */

const makeSelectRegisterPage = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate,
  );

export default makeSelectRegisterPage;
export { selectRegisterPageDomain };
