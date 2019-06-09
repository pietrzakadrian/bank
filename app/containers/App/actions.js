/*
 *
 * App actions
 *
 */

import { LOGGED_IN, LOGGED_OUT, IS_LOGGED } from './constants';

export function loggedInAction(userId, token) {
  return {
    type: LOGGED_IN,
    userId,
    token,
  };
}

export function loggedOutAction() {
  return {
    type: LOGGED_OUT,
  };
}

export function isLoggedAction() {
  return {
    type: IS_LOGGED,
  };
}
