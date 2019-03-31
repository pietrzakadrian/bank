/*
 * AppReducer
 */

import { fromJS } from 'immutable';

import { LOGIN_SUCCESSFUL } from 'containers/LoginPage/constants';
import {
  LOGOUT_SUCCESS,
  NEW_NOTIFICATION,
  UNSET_NOTIFICATION,
} from 'components/App/Header/constants';

import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from './constants';

// The initial state of the App
const initialState = fromJS({
  userId: '',
  isLogged: false,
  isNewNotification: false,
  notifications: [],
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return state.set('userId', action.userId).set('isLogged', true);
    case LOGOUT_SUCCESS:
      return state.set('userId', '').set('isLogged', false);
    case NEW_NOTIFICATION:
      return state.set('isNewNotification', true);
    case UNSET_NOTIFICATION:
      return state.set('isNewNotification', false);
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
