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
  CHECK_NEW_MESSAGES_ERROR,
  CHECK_NEW_NOTIFICATIONS,
  CHECK_NEW_NOTIFICATIONS_SUCCESS,
  CHECK_NEW_NOTIFICATIONS_ERROR,
  GET_NEW_NOTIFICATIONS,
  GET_NEW_NOTIFICATIONS_SUCCESS,
  GET_NEW_NOTIFICATIONS_ERROR,
  UNSET_NEW_NOTIFICATIONS,
  UNSET_NEW_NOTIFICATIONS_SUCCESS,
  UNSET_NEW_NOTIFICATIONS_ERROR,
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

export function checkNewMessagesErrorAction(error) {
  return {
    type: CHECK_NEW_MESSAGES_ERROR,
    error,
  };
}

export function checkNewNotificationsAction() {
  return {
    type: CHECK_NEW_NOTIFICATIONS,
  };
}

export function checkNewNotificationsSuccessAction(notificationCount) {
  return {
    type: CHECK_NEW_NOTIFICATIONS_SUCCESS,
    notificationCount,
  };
}

export function checkNewNotificationsErrorAction(error) {
  return {
    type: CHECK_NEW_NOTIFICATIONS_ERROR,
    error,
  };
}

export function getNewNotificationsAction() {
  return {
    type: GET_NEW_NOTIFICATIONS,
  };
}

export function getNewNotificationsSuccessAction(notifications) {
  return {
    type: GET_NEW_NOTIFICATIONS_SUCCESS,
    notifications,
  };
}

export function getNewNotificationsErrorAction(error) {
  return {
    type: GET_NEW_NOTIFICATIONS_ERROR,
    error,
  };
}

export function unsetNewNotificationsAction() {
  return {
    type: UNSET_NEW_NOTIFICATIONS,
  };
}

export function unsetNewNotificationsSuccessAction() {
  return {
    type: UNSET_NEW_NOTIFICATIONS_SUCCESS,
  };
}

export function unsetNewNotificationsErrorAction(error) {
  return {
    type: UNSET_NEW_NOTIFICATIONS_ERROR,
    error,
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
