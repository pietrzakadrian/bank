/*
 *
 * SettingsPage actions
 *
 */

import {
  CHANGE_NEW_PASSWORD,
  ENTER_NEW_PASSWORD,
  ENTER_NEW_PASSWORD_SUCCESS,
  ENTER_NEW_PASSWORD_ERROR,
  CHANGE_NEW_NAME,
  ENTER_NEW_NAME,
  ENTER_NEW_NAME_SUCCESS,
  ENTER_NEW_NAME_ERROR,
  CHANGE_NEW_SURNAME,
  ENTER_NEW_SURNAME,
  ENTER_NEW_SURNAME_SUCCESS,
  ENTER_NEW_SURNAME_ERROR,
  CHANGE_NEW_EMAIL,
  ENTER_NEW_EMAIL,
  ENTER_NEW_EMAIL_SUCCESS,
  ENTER_NEW_EMAIL_ERROR,
  SAVE_DATA,
  SAVE_DATA_SUCCESS,
  SAVE_DATA_ERROR,
  SAVE_DATA_EMPTY,
  TOGGLE_ALERT_CURRENCY,
  CHANGE_NEW_CURRENCY,
  ENTER_NEW_CURRENCY,
  ENTER_NEW_CURRENCY_SUCCESS,
  ENTER_NEW_CURRENCY_ERROR,
  LOAD_USER_CURRENCY,
  LOAD_USER_CURRENCY_SUCCESS,
  LOAD_USER_CURRENCY_ERROR,
  LOAD_CURRENCY,
  LOAD_CURRENCY_SUCCESS,
  LOAD_CURRENCY_ERROR,
} from './constants';

export function loadUserCurrencyIdAction() {
  return {
    type: LOAD_USER_CURRENCY,
  };
}

export function loadUserCurrencyIdSuccessAction(currencyId) {
  return {
    type: LOAD_USER_CURRENCY_SUCCESS,
    currencyId,
  };
}

export function loadUserCurrencyIdErrorAction(error) {
  return {
    type: LOAD_USER_CURRENCY_ERROR,
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

export function toggleAlertCurrencyAction() {
  return {
    type: TOGGLE_ALERT_CURRENCY,
  };
}

export function changeNewCurrencyAction(currencyId) {
  return {
    type: CHANGE_NEW_CURRENCY,
    currencyId,
  };
}

export function enterNewCurrencyAction(currencyId) {
  return {
    type: ENTER_NEW_CURRENCY,
    currencyId,
  };
}

export function enterNewCurrencySuccessAction(message) {
  return {
    type: ENTER_NEW_CURRENCY_SUCCESS,
    message,
  };
}

export function enterNewCurrencyErrorAction(error) {
  return {
    type: ENTER_NEW_CURRENCY_ERROR,
    error,
  };
}

export function saveDataAction() {
  return {
    type: SAVE_DATA,
  };
}

export function saveDataSuccessAction(message) {
  return {
    type: SAVE_DATA_SUCCESS,
    message,
  };
}

export function saveDataErrorAction(error) {
  return {
    type: SAVE_DATA_ERROR,
    error,
  };
}

export function emptyDataAction(error) {
  return {
    type: SAVE_DATA_EMPTY,
    error,
  };
}

export function changeNewPasswordAction(password) {
  return {
    type: CHANGE_NEW_PASSWORD,
    password,
  };
}

export function enterNewPasswordAction(password) {
  return {
    type: ENTER_NEW_PASSWORD,
    password,
  };
}

export function enterNewPasswordSuccessAction() {
  return {
    type: ENTER_NEW_PASSWORD_SUCCESS,
  };
}

export function enterNewPasswordErrorAction(error) {
  return {
    type: ENTER_NEW_PASSWORD_ERROR,
    error,
  };
}

export function changeNewNameAction(name) {
  return {
    type: CHANGE_NEW_NAME,
    name,
  };
}

export function enterNewNameAction(name) {
  return {
    type: ENTER_NEW_NAME,
    name,
  };
}

export function enterNewNameSuccessAction() {
  return {
    type: ENTER_NEW_NAME_SUCCESS,
  };
}

export function enterNewNameErrorAction(error) {
  return {
    type: ENTER_NEW_NAME_ERROR,
    error,
  };
}

export function changeNewSurnameAction(surname) {
  return {
    type: CHANGE_NEW_SURNAME,
    surname,
  };
}

export function enterNewSurnameAction(surname) {
  return {
    type: ENTER_NEW_SURNAME,
    surname,
  };
}

export function enterNewSurnameSuccessAction() {
  return {
    type: ENTER_NEW_SURNAME_SUCCESS,
  };
}

export function enterNewSurnameErrorAction(error) {
  return {
    type: ENTER_NEW_SURNAME_ERROR,
    error,
  };
}

export function changeNewEmailAction(email) {
  return {
    type: CHANGE_NEW_EMAIL,
    email,
  };
}

export function enterNewEmailAction(email) {
  return {
    type: ENTER_NEW_EMAIL,
    email,
  };
}

export function enterNewEmailSuccessAction() {
  return {
    type: ENTER_NEW_EMAIL_SUCCESS,
  };
}

export function enterNewEmailErrorAction(error) {
  return {
    type: ENTER_NEW_EMAIL_ERROR,
    error,
  };
}
