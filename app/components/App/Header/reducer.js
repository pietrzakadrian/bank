/*
 *
 * HeaderApp reducer
 *
 */

import { fromJS } from 'immutable';

import {
  TOGGLE_MENU_DESKTOP,
  TOGGLE_MENU_MOBILE,
  HIDDEN_MENU_MOBILE,
  TOGGLE_NOTIFICATION,
  LOGOUT_SUCCESS,
} from './constants';

export const initialState = fromJS({
  isMobileOpen: false,
  isDesktopOpen: true,
  isNotificationOpen: false,
});

function headerReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU_DESKTOP:
      return state
        .set('isDesktopOpen', !state.get('isDesktopOpen'))
        .set('isNotificationOpen', false);
    case TOGGLE_MENU_MOBILE:
      return state
        .set('isMobileOpen', !state.get('isMobileOpen'))
        .set('isNotificationOpen', false);
    case HIDDEN_MENU_MOBILE:
      return state.set('isMobileOpen', false);
    case TOGGLE_NOTIFICATION:
      return state.set('isNotificationOpen', !state.get('isNotificationOpen'));
    case LOGOUT_SUCCESS:
      return state
        .set('isNotificationOpen', false)
        .set('isMobileOpen', false)
        .set('isDesktopOpen', true);
    default:
      return state;
  }
}

export default headerReducer;
