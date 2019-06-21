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
  CHECK_NEW_MESSAGES,
  CHECK_NEW_MESSAGES_SUCCESS,
  CHECK_NEW_NOTIFICATIONS,
  CHECK_NEW_NOTIFICATIONS_SUCCESS,
} from './constants';

export function checkNewMessagesAction() {
  return {
    type: CHECK_NEW_MESSAGES,
  };
}

export function checkNewMessagesSuccessAction(messages) {
  return {
    type: CHECK_NEW_MESSAGES_SUCCESS,
    messages,
  };
}

export function checkNewNotificationsAction() {
  return {
    type: CHECK_NEW_NOTIFICATIONS,
  };
}

export function checkNewNotificationsSuccessAction(notifications) {
  return {
    type: CHECK_NEW_NOTIFICATIONS_SUCCESS,
    notifications,
  };
}

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

export function enqueueSnackbarAction(snackbar) {
  const key = snackbar.options && snackbar.options.key;

  return {
    type: ENQUEUE_SNACKBAR,
    snackbar: {
      ...snackbar,
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
