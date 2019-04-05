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
  EMPTY_DATA,
} from './constants';

export function emptyDataAction(error) {
  return {
    type: EMPTY_DATA,
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

export function enterNewPasswordSuccessAction(message) {
  return {
    type: ENTER_NEW_PASSWORD_SUCCESS,
    message,
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

export function enterNewNameSuccessAction(message) {
  return {
    type: ENTER_NEW_NAME_SUCCESS,
    message,
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

export function enterNewSurnameSuccessAction(message) {
  return {
    type: ENTER_NEW_SURNAME_SUCCESS,
    message,
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

export function enterNewEmailSuccessAction(message) {
  return {
    type: ENTER_NEW_EMAIL_SUCCESS,
    message,
  };
}

export function enterNewEmailErrorAction(error) {
  return {
    type: ENTER_NEW_EMAIL_ERROR,
    error,
  };
}
