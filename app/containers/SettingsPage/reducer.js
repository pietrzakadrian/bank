/*
 *
 * SettingsPage reducer
 *
 */

import { fromJS } from 'immutable';
import { LOGOUT_SUCCESS } from 'components/App/Header/constants';
import {
  CHANGE_NEW_PASSWORD,
  ENTER_NEW_PASSWORD,
  ENTER_NEW_PASSWORD_SUCCESS,
  ENTER_NEW_PASSWORD_ERROR,
  CHANGE_NEW_NAME,
  ENTER_NEW_NAME,
  ENTER_NEW_NAME_SUCCESS,
  ENTER_NEW_NAME_ERROR,
  CHANGE_NEW_SURNAME,
  ENTER_NEW_SURNAME,
  ENTER_NEW_SURNAME_SUCCESS,
  ENTER_NEW_SURNAME_ERROR,
  CHANGE_NEW_EMAIL,
  ENTER_NEW_EMAIL,
  ENTER_NEW_EMAIL_SUCCESS,
  ENTER_NEW_EMAIL_ERROR,
  EMPTY_DATA,
} from './constants';

export const initialState = fromJS({
  newPassword: null,
  newName: null,
  newSurname: null,
  newEmail: null,
  errorPassword: null,
  errorName: null,
  errorSurname: null,
  errorEmail: null,
  message: null,
});

function settingsPageReducer(state = initialState, action) {
  switch (action.type) {
    case EMPTY_DATA:
      return state.set('message', action.error);
    case LOGOUT_SUCCESS:
      return state
        .set('newPassword', null)
        .set('newName', null)
        .set('newSurname', null)
        .set('newEmail', null)
        .set('errorPassword', null)
        .set('errorName', null)
        .set('errorSurname', null)
        .set('errorEmail', null)
        .set('message', null);
    case CHANGE_NEW_PASSWORD:
      return state
        .set('newPassword', action.password)
        .set('errorPassword', null);
    case ENTER_NEW_PASSWORD:
      return state
        .set('newPassword', action.password)
        .set('errorPassword', null);
    case ENTER_NEW_PASSWORD_SUCCESS:
      return state
        .set('newPassword', null)
        .set('errorPassword', null)
        .set('message', action.message);
    case ENTER_NEW_PASSWORD_ERROR:
      return state
        .set('errorPassword', action.error)
        .set('message', null)
        .set('newPassword', null);
    case CHANGE_NEW_NAME:
      return state.set('newName', action.name).set('errorName', null);
    case ENTER_NEW_NAME:
      return state.set('newName', action.name).set('errorName', null);
    case ENTER_NEW_NAME_SUCCESS:
      return state
        .set('newName', null)
        .set('errorName', null)
        .set('message', action.message);
    case ENTER_NEW_NAME_ERROR:
      return state
        .set('errorName', action.error)
        .set('message', null)
        .set('newName', null);
    case CHANGE_NEW_SURNAME:
      return state.set('newSurname', action.surname).set('errorSurname', null);
    case ENTER_NEW_SURNAME:
      return state.set('newSurname', action.surname).set('errorSurname', null);
    case ENTER_NEW_SURNAME_SUCCESS:
      return state
        .set('newSurname', null)
        .set('errorSurname', null)
        .set('message', action.message);
    case ENTER_NEW_SURNAME_ERROR:
      return state
        .set('errorSurname', action.error)
        .set('message', null)
        .set('newSurname', null);
    case CHANGE_NEW_EMAIL:
      return state.set('newEmail', action.email).set('errorEmail', null);
    case ENTER_NEW_EMAIL:
      return state.set('newEmail', action.email).set('errorEmail', null);
    case ENTER_NEW_EMAIL_SUCCESS:
      return state
        .set('newEmail', null)
        .set('errorEmail', null)
        .set('message', action.message);
    case ENTER_NEW_EMAIL_ERROR:
      return state
        .set('errorEmail', action.error)
        .set('message', null)
        .set('newEmail', null);
    default:
      return state;
  }
}

export default settingsPageReducer;
