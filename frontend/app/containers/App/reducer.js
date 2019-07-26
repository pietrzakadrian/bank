/*
 *
 * App reducer
 *
 */
import produce, { setAutoFreeze } from 'immer';

import {
  LOGGED_IN,
  IS_LOGGED_SUCCESS,
  IS_LOGGED_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  ENQUEUE_SNACKBAR,
  REMOVE_SNACKBAR,
  TOGGLE_NAVIGATION_DESKTOP,
  TOGGLE_NAVIGATION_MOBILE,
  TOGGLE_MESSAGES,
  TOGGLE_NOTIFICATIONS,
  CHECK_NEW_MESSAGES_SUCCESS,
  CHECK_NEW_MESSAGES_ERROR,
  CHECK_NEW_NOTIFICATIONS_SUCCESS,
  CHECK_NEW_NOTIFICATIONS_ERROR,
  GET_NEW_NOTIFICATIONS_SUCCESS,
  GET_NEW_NOTIFICATIONS_ERROR,
  GET_NEW_MESSAGES_SUCCESS,
  GET_NEW_MESSAGES_ERROR,
  UNSET_NEW_NOTIFICATIONS_SUCCESS,
  UNSET_NEW_NOTIFICATIONS_ERROR,
  UNSET_NEW_MESSAGES_SUCCESS,
  UNSET_NEW_MESSAGES_ERROR,
  UNSET_MANUAL_NEW_NOTIFICATIONS,
  UNSET_MANUAL_NEW_MESSAGES
} from './constants';

export const initialState = {
  isLogged: false,
  messages: [],
  messageCount: 0,
  notifications: [],
  notificationCount: 0,
  snackbars: [],
  error: '',
  isOpenNavigationMobile: false,
  isOpenNavigationDesktop: true,
  isOpenNotifications: false,
  isOpenMessages: false,
  isNewNotifications: false,
  isNewMessages: false,
};

setAutoFreeze(false);
/* eslint-disable default-case, no-param-reassign */
const appPageReducer = produce((draft, action) => {
  switch (action.type) {
    case CHECK_NEW_MESSAGES_SUCCESS:
      draft.isNewMessages = action.isNewMessages;
      draft.messageCount = action.messageCount;
      break;
    case CHECK_NEW_MESSAGES_ERROR:
      draft.error = action.error;
      break;
    case UNSET_NEW_NOTIFICATIONS_SUCCESS:
      draft.notificationCount = 0;
      draft.isNewNotifications = false;
      break;
    case UNSET_NEW_NOTIFICATIONS_ERROR:
      draft.error = action.error;
      break;
    case UNSET_MANUAL_NEW_NOTIFICATIONS:
      draft.notifications = [];
      break;
    case UNSET_NEW_MESSAGES_SUCCESS:
      draft.isNewMessages = false;
      break;
    case UNSET_NEW_MESSAGES_ERROR:
      draft.error = action.error;
      break;
    case UNSET_MANUAL_NEW_MESSAGES:
      draft.messages = [];
      break;
    case CHECK_NEW_NOTIFICATIONS_SUCCESS:
      draft.isNewNotifications = true;
      draft.notificationCount = action.notificationCount;
      break;
    case CHECK_NEW_NOTIFICATIONS_ERROR:
      draft.error = action.error;
      break;
    case GET_NEW_NOTIFICATIONS_SUCCESS:
      draft.notifications = action.notifications;
      break;
    case GET_NEW_NOTIFICATIONS_ERROR:
      draft.error = action.error;
      break;
      case GET_NEW_MESSAGES_SUCCESS:
      draft.messages = action.messages;
      break;
    case GET_NEW_MESSAGES_ERROR:
      draft.error = action.error;
      break;
    case TOGGLE_NAVIGATION_DESKTOP:
      draft.isOpenNavigationDesktop = !draft.isOpenNavigationDesktop;
      draft.isOpenMessages = false;
      draft.isOpenNotifications = false;
      break;
    case TOGGLE_NAVIGATION_MOBILE:
      draft.isOpenNavigationMobile = !draft.isOpenNavigationMobile;
      draft.isOpenMessages = false;
      draft.isOpenNotifications = false;
      break;
    case TOGGLE_MESSAGES:
      draft.isOpenMessages = !draft.isOpenMessages;
      draft.isOpenNotifications = false;
      break;
    case TOGGLE_NOTIFICATIONS:
      draft.isOpenNotifications = !draft.isOpenNotifications;
      draft.isOpenMessages = false;
      break;
    case LOGGED_IN:
      draft.isLogged = true;
      break;
    case IS_LOGGED_SUCCESS:
      draft.isLogged = true;
      break;
    case IS_LOGGED_ERROR:
      draft.isLogged = false;
      break;
    case LOGOUT:
      draft.error = '';
      break;
    case LOGOUT_SUCCESS:
      draft.error = '';
      draft.isLogged = false;
      draft.messages = [];
      draft.notifications = [];
      draft.snackbars = [];
      draft.isOpenNavigationMobile = false;
      draft.isOpenNavigationDesktop = true;
      draft.isOpenNotifications = false;
      draft.isOpenMessages = false;
      draft.isNewNotifications = false;
      draft.isNewMessages = false;
      break;
    case LOGOUT_ERROR:
      draft.error = '';
      draft.messages = [];
      draft.notifications = [];
      draft.snackbars = [];
      draft.isLogged = false;
      draft.isOpenNavigationMobile = false;
      draft.isOpenNavigationDesktop = true;
      draft.isOpenNotifications = false;
      draft.isOpenMessages = false;
      draft.isNewNotifications = false;
      draft.isNewMessages = false;
      break;
    case ENQUEUE_SNACKBAR:
      draft.snackbars = [
        ...draft.snackbars,
        {
          key: action.key,
          ...action.snackbar,
        },
      ];
      break;
    case REMOVE_SNACKBAR:
      draft.snackbars = [];
      break;
  }
}, initialState);

export default appPageReducer;
