import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registerPage state domain
 */

const selectRegisterPageDomain = state =>
  state.get('registerPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RegisterPage
 */

const makeSelectRegisterPage = () =>
  createSelector(selectRegisterPageDomain, substate => substate.toJS());

const makeIdSelector = () =>
  createSelector(selectRegisterPageDomain, substate => substate.get('id'));

const makePasswordSelector = () =>
  createSelector(selectRegisterPageDomain, substate =>
    substate.get('password'),
  );

const makeNameSelector = () =>
  createSelector(selectRegisterPageDomain, substate => substate.get('name'));

const makeSurnameSelector = () =>
  createSelector(selectRegisterPageDomain, substate => substate.get('surname'));

const makeEmailSelector = () =>
  createSelector(selectRegisterPageDomain, substate => substate.get('email'));

const makeErrorSelector = () =>
  createSelector(selectRegisterPageDomain, substate => substate.get('error'));

const makeErrorDataProcessingAgreementSelector = () =>
  createSelector(selectRegisterPageDomain, substate =>
    substate.get('errorDataProcessingAgreement'),
  );

const makeActiveStepSelector = () =>
  createSelector(selectRegisterPageDomain, substate =>
    substate.get('activeStep'),
  );

const makeIsDataProcessingAgreementSelector = () =>
  createSelector(selectRegisterPageDomain, substate =>
    substate.get('isDataProcessingAgreement'),
  );

export default makeSelectRegisterPage;
export {
  makeIdSelector,
  makePasswordSelector,
  makeNameSelector,
  makeSurnameSelector,
  makeEmailSelector,
  makeErrorSelector,
  makeIsDataProcessingAgreementSelector,
  makeErrorDataProcessingAgreementSelector,
  makeActiveStepSelector,
};
