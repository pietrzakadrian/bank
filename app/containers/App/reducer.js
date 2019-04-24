/*
 * AppReducer
 */

import { fromJS } from 'immutable';

import { LOGIN_SUCCESSFUL } from 'containers/LoginPage/constants';
import {
  LOGOUT_SUCCESS,
  NEW_NOTIFICATION,
  UNSET_NOTIFICATION,
  LOAD_NEW_NOTIFICATION,
} from 'components/App/Header/constants';

import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from './constants';

// The initial state of the App
const initialState = fromJS({
  userId: '',
  isLogged: false,
  isNewNotification: false,
  notificationCount: 0,
  notifications: [],
  newNotifications: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return state.set('userId', action.userId).set('isLogged', true);
    case LOGOUT_SUCCESS:
      return state
        .set('userId', '')
        .set('isLogged', false)
        .set('isNewNotification', false)
        .set('notificationCount', 0);
    case NEW_NOTIFICATION:
      return state
        .set('isNewNotification', true)
        .set('notificationCount', action.notificationCount);
    case LOAD_NEW_NOTIFICATION:
      return state.set('newNotifications', action.notifications);
    case UNSET_NOTIFICATION:
      return state
        .set('isNewNotification', false)
        .set('notificationCount', 0)
        .set('newNotifications', null);
    case ENQUEUE_SNACKBAR:
      return state.set('notifications', [
        ...state.get('notifications'),
        {
          ...action.notification,
        },
      ]);
    case REMOVE_SNACKBAR:
      return state.set(
        'notifications',
        state
          .get('notifications')
          .filter(notification => notification.key !== action.key),
      );
    default:
      return state;
  }
}

export default appReducer;
