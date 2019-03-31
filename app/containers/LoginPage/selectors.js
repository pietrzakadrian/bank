import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.get('loginPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(selectLoginPageDomain, substate => substate.toJS());

const makeIdSelector = () =>
  createSelector(selectLoginPageDomain, substate => substate.get('id'));

const makeIdErrorSelector = () =>
  createSelector(selectLoginPageDomain, substate => substate.get('idError'));

const makePasswordSelector = () =>
  createSelector(selectLoginPageDomain, substate => substate.get('password'));

const makePasswordErrorSelector = () =>
  createSelector(selectLoginPageDomain, substate =>
    substate.get('passwordError'),
  );

const makeLoginErrorSelector = () =>
  createSelector(selectLoginPageDomain, substate => substate.get('loginError'));

const makeIsIdExistSelector = () =>
  createSelector(selectLoginPageDomain, substate => substate.get('isIdExist'));

export default makeSelectLoginPage;
export {
  selectLoginPageDomain,
  makeIdSelector,
  makeIdErrorSelector,
  makePasswordSelector,
  makePasswordErrorSelector,
  makeLoginErrorSelector,
  makeIsIdExistSelector,
};
