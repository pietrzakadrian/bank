/*
 *
 * LoginPage actions
 *
 */
import decode from 'jwt-decode';

import {
  CHANGE_ID,
  ENTER_ID,
  CHANGE_PASSWORD,
  ENTER_PASSWORD,
  ENTER_ID_SUCCESS,
  ENTER_ID_ERROR,
  EMPTY_ID_ERROR,
  ENTER_PASSWORD_SUCCESS,
  ENTER_PASSWORD_ERROR,
  EMPTY_PASSWORD_ERROR,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILURE,
  LOGIN_STEP_BACK,
} from './constants';

export function changeIdAction(id) {
  return {
    type: CHANGE_ID,
    id,
  };
}

export function changePasswordAction(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function enterIdAction(id) {
  return {
    type: ENTER_ID,
    id,
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

export function emptyIdAction(error) {
  return {
    type: EMPTY_ID_ERROR,
    error,
  };
}

export function enterPasswordAction(password) {
  return {
    type: ENTER_PASSWORD,
    password,
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

export function emptyPasswordAction(error) {
  return {
    type: EMPTY_PASSWORD_ERROR,
    error,
  };
}

export function successLoginAction(jwt) {
  localStorage.setItem('id_token', jwt);
  const token = decode(jwt);
  const userId = token.id;
  return {
    type: LOGIN_SUCCESSFUL,
    userId,
  };
}

export function errorLoginAction(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

export function loginStepBackAction() {
  return {
    type: LOGIN_STEP_BACK,
  };
}
