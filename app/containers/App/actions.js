/*
 *
 * App actions
 *
 */

import {
  IS_LOGGED,
  LOGGED_IN,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  ENQUEUE_SNACKBAR,
  CLOSE_SNACKBAR,
  REMOVE_SNACKBAR,
  TOGGLE_NAVIGATION_DESKTOP,
  TOGGLE_NAVIGATION_MOBILE,
  TOGGLE_MESSAGES,
  TOGGLE_NOTIFICATIONS,
} from './constants';

export function isLoggedAction() {
  return {
    type: IS_LOGGED,
  };
}

export function loggedInAction(userId, token) {
  return {
    type: LOGGED_IN,
    userId,
    token,
  };
}

export function logoutAction() {
  return {
    type: LOGOUT,
  };
}

export function logoutSuccessAction() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function toggleNavigationDesktopAction() {
  return {
    type: TOGGLE_NAVIGATION_DESKTOP,
  };
}

export function toggleNavigationMobileAction() {
  return {
    type: TOGGLE_NAVIGATION_MOBILE,
  };
}

export function toggleMessagesAction() {
  return {
    type: TOGGLE_MESSAGES,
  };
}

export function toggleNotificationsAction() {
  return {
    type: TOGGLE_NOTIFICATIONS,
  };
}

export function logoutErrorAction(error) {
  return {
    type: LOGOUT_ERROR,
    error,
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
