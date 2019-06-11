/*
 *
 * App actions
 *
 */

import {
  LOGGED_IN,
  LOGGED_OUT,
  ENQUEUE_SNACKBAR,
  CLOSE_SNACKBAR,
  REMOVE_SNACKBAR,
} from './constants';

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

export function enqueueSnackbarAction(notification) {
  const key = notification.options && notification.options.key;

  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
}

export function closeSnackbarAction(key) {
  return {
    type: CLOSE_SNACKBAR,
    dismissAll: !key,
    key,
  };
}

export function removeSnackbarAction(key) {
  return {
    type: REMOVE_SNACKBAR,
    key,
  };
}
