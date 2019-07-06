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

/**
 * Check the new messages, this action starts the request saga
 *
 * @return {object} An action object with a type of CHECK_NEW_MESSAGES
 */
export function checkNewMessagesAction() {
  return {
    type: CHECK_NEW_MESSAGES,
  };
}

/**
 * Dispatched when the new messages are loaded by the request saga
 *
 * @param  {array} messages The messages data
 *
 * @return {object} An action object with a type of CHECK_NEW_MESSAGES_SUCCESS passing the repos
 */
export function checkNewMessagesSuccessAction(messages) {
  return {
    type: CHECK_NEW_MESSAGES_SUCCESS,
    messages,
  };
}

/**
 * Dispatched when loading the new messages fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of CHECK_NEW_MESSAGES_ERROR passing the repos
 */
export function checkNewMessagesErrorAction(error) {
  return {
    type: CHECK_NEW_MESSAGES_ERROR,
    error,
  };
}

/**
 * Check the new notifications, this action starts the request saga
 *
 * @return {object} An action object with a type of CHECK_NEW_NOTIFICATIONS
 */
export function checkNewNotificationsAction() {
  return {
    type: CHECK_NEW_NOTIFICATIONS,
  };
}

/**
 * Dispatched when the new notifications are loaded by the request saga
 *
 * @param  {number} notificationCount The messages data
 *
 * @return {object} An action object with a type of CHECK_NEW_NOTIFICATIONS_SUCCESS passing the repos
 */
export function checkNewNotificationsSuccessAction(notificationCount) {
  return {
    type: CHECK_NEW_NOTIFICATIONS_SUCCESS,
    notificationCount,
  };
}

/**
 * Dispatched when loading the new notifications fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of CHECK_NEW_NOTIFICATIONS_ERROR passing the repos
 */
export function checkNewNotificationsErrorAction(error) {
  return {
    type: CHECK_NEW_NOTIFICATIONS_ERROR,
    error,
  };
}

/**
 * Get the new notifications, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_NEW_NOTIFICATIONS
 */
export function getNewNotificationsAction() {
  return {
    type: GET_NEW_NOTIFICATIONS,
  };
}

/**
 * Dispatched when the new notifications are loaded by the request saga
 *
 * @param  {array} notifications The notifications data
 *
 * @return {object} An action object with a type of GET_NEW_NOTIFICATIONS_SUCCESS passing the repos
 */
export function getNewNotificationsSuccessAction(notifications) {
  return {
    type: GET_NEW_NOTIFICATIONS_SUCCESS,
    notifications,
  };
}

/**
 * Dispatched when loading the new notifications fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_NEW_NOTIFICATIONS_ERROR passing the repos
 */
export function getNewNotificationsErrorAction(error) {
  return {
    type: GET_NEW_NOTIFICATIONS_ERROR,
    error,
  };
}

/**
 * Unset the new notifications, this action starts the request saga
 *
 * @return {object} An action object with a type of UNSET_NEW_NOTIFICATIONS
 */
export function unsetNewNotificationsAction() {
  return {
    type: UNSET_NEW_NOTIFICATIONS,
  };
}

/**
 * Dispatched when unset the new notifications are successed by the request saga
 *
 * @return {object} An action object with a type of UNSET_NEW_NOTIFICATIONS_SUCCESS passing the repos
 */
export function unsetNewNotificationsSuccessAction() {
  return {
    type: UNSET_NEW_NOTIFICATIONS_SUCCESS,
  };
}

/**
 * Dispatched when unset the new notifications fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of UNSET_NEW_NOTIFICATIONS_ERROR passing the repos
 */
export function unsetNewNotificationsErrorAction(error) {
  return {
    type: UNSET_NEW_NOTIFICATIONS_ERROR,
    error,
  };
}

/**
 * Check user is logged, this action starts the request saga
 *
 * @return {object} An action object with a type of IS_LOGGED
 */
export function isLoggedAction() {
  return {
    type: IS_LOGGED,
  };
}

/**
 * User login to the application, this is the global action
 *
 * @param  {number} userId The userId
 * @param  {string} token The token
 *
 * @return {object} An action object with a type of LOGGED_IN
 */
export function loggedInAction(userId, token) {
  return {
    type: LOGGED_IN,
    userId,
    token,
  };
}

/**
 * Start the logout process, this action starts the request saga
 *
 * @return {object} An action object with a type of LOGOUT
 */
export function logoutAction() {
  return {
    type: LOGOUT,
  };
}

/**
 * Dispatched when the logout process are loaded by the request saga
 *
 * @return {object} An action object with a type of LOGOUT_SUCCESS
 */
export function logoutSuccessAction() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

/**
 * Dispatched when loading the new notifications fails
 *
 * @param  {object} error The error
 *
 * @return {object}      An action object with a type of LOGOUT_ERROR passing the repos
 */
export function logoutErrorAction(error) {
  return {
    type: LOGOUT_ERROR,
    error,
  };
}

/**
 * Toggle navigation desktop
 *
 * @return {object} An action object with a type of TOGGLE_NAVIGATION_DESKTOP
 */
export function toggleNavigationDesktopAction() {
  return {
    type: TOGGLE_NAVIGATION_DESKTOP,
  };
}

/**
 * Toggle navigation mobile
 *
 * @return {object} An action object with a type of TOGGLE_NAVIGATION_MOBILE
 */
export function toggleNavigationMobileAction() {
  return {
    type: TOGGLE_NAVIGATION_MOBILE,
  };
}

/**
 * Toggle messages
 *
 * @return {object} An action object with a type of TOGGLE_MESSAGES
 */
export function toggleMessagesAction() {
  return {
    type: TOGGLE_MESSAGES,
  };
}

/**
 * Toggle notifications
 *
 * @return {object} An action object with a type of TOGGLE_NOTIFICATIONS
 */
export function toggleNotificationsAction() {
  return {
    type: TOGGLE_NOTIFICATIONS,
  };
}

/**
 * Enqueue snackbar on the screen
 * @param  {object} snackbar The snackbar
 *
 * @return {object} An action object with a type of TOGGLE_NOTIFICATIONS
 */
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

/**
 * Remove snackbar from the screen
 *
 * @return {object} An action object with a type of REMOVE_SNACKBAR
 */
export function removeSnackbarAction() {
  return {
    type: REMOVE_SNACKBAR,
  };
}
