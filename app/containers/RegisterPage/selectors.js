import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registerPage state domain
 */

const selectRegisterPageDomain = state => state.registerPage || initialState;

/**
 * Other specific selectors
 */

const makeLoginSelector = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate.login,
  );

const makePasswordSelector = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate.password,
  );

const makeNameSelector = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate.name,
  );

const makeSurnameSelector = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate.surname,
  );

const makeEmailSelector = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate.email,
  );

const makeErrorSelector = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate.error,
  );

const makeCurrencySelector = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate.currency,
  );

const makeCurrencyIdSelector = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate.currencyId,
  );

const makeIsDataProcessingAgreementSelector = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate.isDataProcessingAgreement,
  );

const makeErrorDataProcessingAgreementSelector = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate.errorDataProcessingAgreement,
  );

const makeIsLoadingSelector = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate.isLoading,
  );

const makeActiveStepSelector = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate.activeStep,
  );

/**
 * Default selector used by RegisterPage
 */

const makeSelectRegisterPage = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate,
  );

export default makeSelectRegisterPage;
export {
  makeLoginSelector,
  makePasswordSelector,
  makeNameSelector,
  makeSurnameSelector,
  makeEmailSelector,
  makeErrorSelector,
  makeCurrencySelector,
  makeCurrencyIdSelector,
  makeIsDataProcessingAgreementSelector,
  makeErrorDataProcessingAgreementSelector,
  makeIsLoadingSelector,
  makeActiveStepSelector,
  selectRegisterPageDomain,
};
