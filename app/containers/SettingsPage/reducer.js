/*
 *
 * SettingsPage reducer
 *
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
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
  SAVE_DATA,
  SAVE_DATA_SUCCESS,
  SAVE_DATA_ERROR,
  SAVE_DATA_EMPTY,
  TOGGLE_ALERT_CURRENCY,
  CHANGE_NEW_CURRENCY,
  ENTER_NEW_CURRENCY,
  ENTER_NEW_CURRENCY_SUCCESS,
  LOAD_CURRENCY,
  LOAD_CURRENCY_SUCCESS,
  LOAD_USER_CURRENCY_SUCCESS,
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
  openAlert: false,
  currency: null,
  currencyId: null,
  userCurrencyId: null,
  currencyMessage: null,
  isLoading: false,
});

function settingsPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state
        .set('isLoading', false)
        .set('newPassword', null)
        .set('newName', null)
        .set('newSurname', null)
        .set('newEmail', null)
        .set('errorPassword', null)
        .set('errorName', null)
        .set('errorSurname', null)
        .set('errorEmail', null)
        .set('currencyMessage', null)
        .set('message', null)
        .set('openAlert', false);
    case LOAD_USER_CURRENCY_SUCCESS:
      return state.set('userCurrencyId', action.currencyId);
    case LOAD_CURRENCY:
      return state.set('isLoading', true);
    case LOAD_CURRENCY_SUCCESS:
      return state
        .set('currency', action.currency)
        .set('currencyId', state.get('userCurrencyId'));
    case ENTER_NEW_CURRENCY:
      return state.set('isLoading', true);
    case ENTER_NEW_CURRENCY_SUCCESS:
      return state
        .set('openAlert', false)
        .set('currencyMessage', action.message)
        .set('userCurrencyId', null);
    case CHANGE_NEW_CURRENCY:
      return state
        .set('currencyId', action.currencyId)
        .set('openAlert', true)
        .set('currencyMessage', null);
    case TOGGLE_ALERT_CURRENCY:
      return state.set('openAlert', !state.get('openAlert'));
    case SAVE_DATA:
      return state;
    case SAVE_DATA_SUCCESS:
      return state.set('message', action.message);
    case SAVE_DATA_ERROR:
      return state.set('error', action.error);
    case SAVE_DATA_EMPTY:
      return state.set('message', action.error);
    case CHANGE_NEW_PASSWORD:
      return state
        .set('newPassword', action.password)
        .set('errorPassword', null);
    case ENTER_NEW_PASSWORD:
      return state
        .set('newPassword', action.password)
        .set('errorPassword', null);
    case ENTER_NEW_PASSWORD_SUCCESS:
      return state.set('newPassword', null).set('errorPassword', null);
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
      return state.set('newName', null).set('errorName', null);
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
      return state.set('newSurname', null).set('errorSurname', null);
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
      return state.set('newEmail', null).set('errorEmail', null);
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
