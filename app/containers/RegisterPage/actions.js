/*
 *
 * RegisterPage actions
 *
 */

import {
  CHANGE_LOGIN,
  ENTER_LOGIN,
  ENTER_LOGIN_SUCCESS,
  ENTER_LOGIN_ERROR,
  CHANGE_PASSWORD,
  ENTER_PASSWORD,
  ENTER_PASSWORD_SUCCESS,
  ENTER_PASSWORD_ERROR,
  CHANGE_NAME,
  ENTER_NAME,
  ENTER_NAME_SUCCESS,
  ENTER_NAME_ERROR,
  CHANGE_SURNAME,
  ENTER_SURNAME,
  ENTER_SURNAME_SUCCESS,
  ENTER_SURNAME_ERROR,
  LOAD_CURRENCY,
  LOAD_CURRENCY_SUCCESS,
  LOAD_CURRENCY_ERROR,
  CHANGE_CURRENCY,
  ENTER_CURRENCY,
  ENTER_CURRENCY_SUCCESS,
  ENTER_CURRENCY_ERROR,
  CHANGE_EMAIL,
  ENTER_EMAIL,
  ENTER_EMAIL_SUCCESS,
  ENTER_EMAIL_ERROR,
  TOGGLE_DATA_PROCESSING_AGREEMENT,
  DATA_PROCESSING_AGREEMENT_ERROR,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  STEP_NEXT,
  STEP_BACK,
} from './constants';

export function changeLoginAction(login) {
  return {
    type: CHANGE_LOGIN,
    login,
  };
}

export function enterLoginAction(login) {
  return {
    type: ENTER_LOGIN,
    login,
  };
}

export function enterLoginSuccessAction() {
  return {
    type: ENTER_LOGIN_SUCCESS,
  };
}

export function enterLoginErrorAction(error) {
  return {
    type: ENTER_LOGIN_ERROR,
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

export function enterPasswordSuccessAction() {
  return {
    type: ENTER_PASSWORD_SUCCESS,
  };
}

export function enterPasswordErrorAction(error) {
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

export function enterNameSuccessAction() {
  return {
    type: ENTER_NAME_SUCCESS,
  };
}

export function enterNameErrorAction(error) {
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

export function enterSurnameSuccessAction() {
  return {
    type: ENTER_SURNAME_SUCCESS,
  };
}

export function enterSurnameErrorAction(error) {
  return {
    type: ENTER_SURNAME_ERROR,
    error,
  };
}

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

export function changeCurrencyAction(currencyId) {
  return {
    type: CHANGE_CURRENCY,
    currencyId,
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

export function enterEmailSuccessAction() {
  return {
    type: ENTER_EMAIL_SUCCESS,
  };
}

export function enterEmailErrorAction(error) {
  return {
    type: ENTER_EMAIL_ERROR,
    error,
  };
}

export function toggleDataProcessingAgreementAction() {
  return {
    type: TOGGLE_DATA_PROCESSING_AGREEMENT,
  };
}

export function errorDataProcessingAgreementAction(error) {
  return {
    type: DATA_PROCESSING_AGREEMENT_ERROR,
    error,
  };
}

export function registerAction(
  login,
  password,
  name,
  surname,
  currencyId,
  isDataProcessingAgreement,
  email,
) {
  return {
    type: REGISTER,
    login,
    password,
    name,
    surname,
    currencyId,
    isDataProcessingAgreement,
    email,
  };
}

export function registerSuccessAction() {
  return {
    type: REGISTER_SUCCESS,
  };
}

export function registerErrorAction(error) {
  return {
    type: REGISTER_ERROR,
    error,
  };
}

export function stepNextAction() {
  return {
    type: STEP_NEXT,
  };
}

export function stepBackAction() {
  return {
    type: STEP_BACK,
  };
}
