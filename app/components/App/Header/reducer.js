/*
 *
 * HeaderApp reducer
 *
 */

import { fromJS } from 'immutable';

import {
  TOGGLE_MENU_DESKTOP,
  TOGGLE_MENU_MOBILE,
  TOGGLE_MESSAGES,
  HIDDEN_MENU_MOBILE,
  TOGGLE_NOTIFICATION,
  LOGOUT_SUCCESS,
} from './constants';

export const initialState = fromJS({
  isMobileOpen: false,
  isDesktopOpen: true,
  isNotificationsOpen: false,
  isMessagesOpen: false,
});

function headerReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MESSAGES:
      return state
        .set('isMessagesOpen', !state.get('isMessagesOpen'))
        .set('isNotificationsOpen', false);
    case TOGGLE_MENU_DESKTOP:
      return state
        .set('isDesktopOpen', !state.get('isDesktopOpen'))
        .set('isNotificationsOpen', false);
    case TOGGLE_MENU_MOBILE:
      return state
        .set('isMobileOpen', !state.get('isMobileOpen'))
        .set('isNotificationsOpen', false)
        .set('isMessagesOpen', false);
    case HIDDEN_MENU_MOBILE:
      return state.set('isMobileOpen', false);
    case TOGGLE_NOTIFICATION:
      return state
        .set('isNotificationsOpen', !state.get('isNotificationsOpen'))
        .set('isMessagesOpen', false);
    case LOGOUT_SUCCESS:
      return state
        .set('isNotificationsOpen', false)
        .set('isMobileOpen', false)
        .set('isDesktopOpen', true)
        .set('isMessagesOpen', false);
    default:
      return state;
  }
}

export default headerReducer;
