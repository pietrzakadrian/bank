/*
 *
 * App reducer
 *
 */
import produce, { setAutoFreeze } from 'immer';
import {
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

export const initialState = {
  isLogged: false,
  userId: '',
  token: '',
  notifications: [],
  error: '',
  isOpenNavigationMobile: false,
  isOpenNavigationDesktop: true,
  isOpenNotifications: false,
  isOpenMessages: false,
};

setAutoFreeze(false);
/* eslint-disable default-case, no-param-reassign */
const appPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_NAVIGATION_DESKTOP:
        draft.isOpenNavigationDesktop = !draft.isOpenNavigationDesktop;
        break;
      case TOGGLE_NAVIGATION_MOBILE:
        draft.isOpenNavigationMobile = !draft.isOpenNavigationMobile;
        break;
      case TOGGLE_MESSAGES:
        draft.isOpenMessages = !draft.isOpenMessages;
        break;
      case TOGGLE_NOTIFICATIONS:
        draft.isOpenNotifications = !draft.isOpenNotifications;
        break;
      case LOGGED_IN:
        draft.isLogged = true;
        draft.userId = action.userId;
        draft.token = action.token;
        break;
      case LOGOUT:
        draft.isLogged = true;
        draft.error = '';
        break;
      case LOGOUT_SUCCESS:
        draft.isLogged = false;
        draft.userId = '';
        draft.token = '';
        draft.error = '';
        draft.isOpenNavigationMobile = false;
        draft.isOpenNavigationDesktop = true;
        draft.isOpenNotifications = false;
        draft.isOpenMessages = false;
        break;
      case LOGOUT_ERROR:
        draft.error = action.error;
        break;
      case ENQUEUE_SNACKBAR:
        draft.notifications = [
          ...draft.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ];
        break;
      case CLOSE_SNACKBAR:
        draft.notifications = draft.notifications.map(notification =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification },
        );
        break;
      case REMOVE_SNACKBAR:
        draft.notifications = draft.notifications.filter(
          notification => notification.key !== action.key,
        );
        break;
    }
  });

export default appPageReducer;
