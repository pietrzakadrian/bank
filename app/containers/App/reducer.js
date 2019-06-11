/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import {
  LOGGED_IN,
  LOGGED_OUT,
  ENQUEUE_SNACKBAR,
  CLOSE_SNACKBAR,
  REMOVE_SNACKBAR,
} from './constants';

export const initialState = {
  isLogged: false,
  userId: null,
  token: '',
  notifications: [],
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGGED_IN:
        draft.isLogged = true;
        draft.userId = action.userId;
        draft.token = action.token;
        break;
      case LOGGED_OUT:
        draft.isLogged = false;
        draft.userId = '';
        draft.token = '';
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

export default loginPageReducer;
