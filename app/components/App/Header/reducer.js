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
} from './constants';

export const initialState = fromJS({
  isMobileOpen: false,
  isDesktopOpen: true,
});

function headerReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU_DESKTOP:
      return state.set('isDesktopOpen', !state.get('isDesktopOpen'));
    case TOGGLE_MENU_MOBILE:
      return state.set('isMobileOpen', !state.get('isMobileOpen'));
    case HIDDEN_MENU_MOBILE:
      return state.set('isMobileOpen', false);
    default:
      return state;
  }
}

export default headerReducer;
