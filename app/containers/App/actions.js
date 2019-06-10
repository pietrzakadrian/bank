/*
 *
 * App actions
 *
 */

import { LOGGED_IN, LOGGED_OUT } from './constants';

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
