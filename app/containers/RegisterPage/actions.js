/*
 *
 * RegisterPage actions
 *
 */

import {
  CHANGE_ID,
  ENTER_ID,
  ENTER_ID_SUCCESS,
  ENTER_ID_ERROR,
  EMPTY_ID_ERROR,
  CHANGE_PASSWORD,
  ENTER_PASSWORD,
  ENTER_PASSWORD_SUCCESS,
  ENTER_PASSWORD_ERROR,
  EMPTY_PASSWORD_ERROR,
  CHANGE_CURRENCY,
  LOAD_CURRENCY,
  LOAD_CURRENCY_ERROR,
  LOAD_CURRENCY_SUCCESS,
  ENTER_CURRENCY,
  ENTER_CURRENCY_SUCCESS,
  ENTER_CURRENCY_ERROR,
  CHANGE_NAME,
  ENTER_NAME,
  ENTER_NAME_SUCCESS,
  ENTER_NAME_ERROR,
  EMPTY_NAME_ERROR,
  CHANGE_SURNAME,
  ENTER_SURNAME,
  ENTER_SURNAME_SUCCESS,
  ENTER_SURNAME_ERROR,
  EMPTY_SURNAME_ERROR,
  CHANGE_EMAIL,
  ENTER_EMAIL,
  ENTER_EMAIL_SUCCESS,
  ENTER_EMAIL_ERROR,
  EMPTY_EMAIL_ERROR,
  TOGGLE_DATA_PROCESSING_AGREEMENT,
  DATA_PROCESSING_AGREEMENT_ERROR,
  REGISTER_SUCCESSFUL,
  REGISTER_FAILURE,
  REGISTER_STEP_NEXT,
  REGISTER_STEP_BACK,
} from './constants';

export function loadCurrencyAction() {
  return {
    type: LOAD_CURRENCY,
  };
}

export function loadCurrencySuccessAction(currency) {
  return {
    type: LOAD_CURRENCY_SUCCESS,
    currency,
  };
}

export function loadCurrencyErrorAction(error) {
  return {
    type: LOAD_CURRENCY_ERROR,
    error,
  };
}

export function changeCurrencyAction(currency) {
  return {
    type: CHANGE_CURRENCY,
    currency,
  };
}

export function enterCurrencyAction(currencyId) {
  return {
    type: ENTER_CURRENCY,
    currencyId,
  };
}

export function enterCurrencySuccessAction() {
  return {
    type: ENTER_CURRENCY_SUCCESS,
  };
}

export function enterCurrencyErrorAction(error) {
  return {
    type: ENTER_CURRENCY_ERROR,
    error,
  };
}

export function errorDataProcessingAgreementAction(error) {
  return {
    type: DATA_PROCESSING_AGREEMENT_ERROR,
    error,
  };
}

export function toggleDataProcessingAgreementAction() {
  return {
    type: TOGGLE_DATA_PROCESSING_AGREEMENT,
  };
}

export function successRegisterAction() {
  sessionStorage.setItem('register', true);
  return {
    type: REGISTER_SUCCESSFUL,
  };
}

export function errorRegisterAction(error) {
  return {
    type: REGISTER_FAILURE,
    error,
  };
}

export function changeIdAction(id) {
  return {
    type: CHANGE_ID,
    id,
  };
}

export function enterIdAction(id) {
  return {
    type: ENTER_ID,
    id,
  };
}

export function emptyIdAction(error) {
  return {
    type: EMPTY_ID_ERROR,
    error,
  };
}

export function successIdAction() {
  return {
    type: ENTER_ID_SUCCESS,
  };
}

export function errorIdAction(error) {
  return {
    type: ENTER_ID_ERROR,
    error,
  };
}

export function changePasswordAction(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function enterPasswordAction(password) {
  return {
    type: ENTER_PASSWORD,
    password,
  };
}

export function emptyPasswordAction(error) {
  return {
    type: EMPTY_PASSWORD_ERROR,
    error,
  };
}

export function successPasswordAction() {
  return {
    type: ENTER_PASSWORD_SUCCESS,
  };
}

export function errorPasswordAction(error) {
  return {
    type: ENTER_PASSWORD_ERROR,
    error,
  };
}

export function changeNameAction(name) {
  return {
    type: CHANGE_NAME,
    name,
  };
}

export function enterNameAction(name) {
  return {
    type: ENTER_NAME,
    name,
  };
}

export function emptyNameAction(error) {
  return {
    type: EMPTY_NAME_ERROR,
    error,
  };
}

export function successNameAction() {
  return {
    type: ENTER_NAME_SUCCESS,
  };
}

export function errorNameAction(error) {
  return {
    type: ENTER_NAME_ERROR,
    error,
  };
}

export function changeSurnameAction(surname) {
  return {
    type: CHANGE_SURNAME,
    surname,
  };
}

export function enterSurnameAction(surname) {
  return {
    type: ENTER_SURNAME,
    surname,
  };
}

export function emptySurnameAction(error) {
  return {
    type: EMPTY_SURNAME_ERROR,
    error,
  };
}

export function successSurnameAction() {
  return {
    type: ENTER_SURNAME_SUCCESS,
  };
}

export function errorSurnameAction(error) {
  return {
    type: ENTER_SURNAME_ERROR,
    error,
  };
}

export function changeEmailAction(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function enterEmailAction(email) {
  return {
    type: ENTER_EMAIL,
    email,
  };
}

export function emptyEmailAction(error) {
  return {
    type: EMPTY_EMAIL_ERROR,
    error,
  };
}

export function successEmailAction() {
  return {
    type: ENTER_EMAIL_SUCCESS,
  };
}

export function errorEmailAction(error) {
  return {
    type: ENTER_EMAIL_ERROR,
    error,
  };
}

export function registerStepNextAction() {
  return {
    type: REGISTER_STEP_NEXT,
  };
}

export function registerStepBackAction() {
  return {
    type: REGISTER_STEP_BACK,
  };
}
