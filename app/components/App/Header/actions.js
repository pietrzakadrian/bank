/*
 *
 * HeaderApp actions
 *
 */

import {
  TOGGLE_MENU_DESKTOP,
  TOGGLE_MENU_MOBILE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  IS_NOTIFICATION,
  NEW_NOTIFICATION,
  UNSET_NOTIFICATION,
  HIDDEN_MENU_MOBILE,
  TOGGLE_NOTIFICATION,
} from './constants';

export function toggleNotificationAction() {
  return {
    type: TOGGLE_NOTIFICATION,
  };
}

export function isNotificationAction() {
  return {
    type: IS_NOTIFICATION,
  };
}

export function newNotificationAction(notificationCount) {
  return {
    type: NEW_NOTIFICATION,
    notificationCount,
  };
}

export function unsetNotificationAction() {
  return {
    type: UNSET_NOTIFICATION,
  };
}

export function toggleMenuDesktopAction() {
  return {
    type: TOGGLE_MENU_DESKTOP,
  };
}

export function toggleMenuMobileAction() {
  return {
    type: TOGGLE_MENU_MOBILE,
  };
}

export function hiddenMenuMobileAction() {
  return {
    type: HIDDEN_MENU_MOBILE,
  };
}

export function logoutAction(id) {
  return {
    type: LOGOUT,
    id,
  };
}

export function successLogoutAction() {
  localStorage.removeItem('id_token');
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function errorLogoutAction(error) {
  return {
    type: LOGOUT_ERROR,
    error,
  };
}
