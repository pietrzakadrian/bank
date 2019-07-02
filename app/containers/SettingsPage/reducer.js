/*
 *
 * SettingsPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
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
  TOGGLE_ALERT_CURRENCY,
  CHANGE_NEW_CURRENCY,
  ENTER_NEW_CURRENCY,
  ENTER_NEW_CURRENCY_SUCCESS,
  ENTER_NEW_CURRENCY_ERROR,
  LOAD_USER_CURRENCY,
  LOAD_USER_CURRENCY_SUCCESS,
  LOAD_USER_CURRENCY_ERROR,
  LOAD_USER_DATA,
  LOAD_USER_DATA_SUCCESS,
  LOAD_USER_DATA_ERROR,
  LOAD_CURRENCY,
  LOAD_CURRENCY_SUCCESS,
  LOAD_CURRENCY_ERROR,
} from './constants';

export const initialState = {
  name: '',
  surname: '',
  email: '',
  newPassword: '',
  newName: '',
  newSurname: '',
  newEmail: '',
  errorPassword: '',
  errorName: '',
  errorSurname: '',
  errorEmail: '',
  error: '',
  message: '',
  currency: [],
  currencyId: 1,
  newCurrencyId: null,
  currencyMessage: '',
  isOpenAlert: false,
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const settingsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOCATION_CHANGE:
        draft.newPassword = '';
        draft.newName = '';
        draft.newSurname = '';
        draft.newEmail = '';
        draft.errorPassword = '';
        draft.errorName = '';
        draft.errorSurname = '';
        draft.errorEmail = '';
        draft.error = '';
        draft.message = '';
        draft.currencyMessage = '';
        draft.isOpenAlert = false;
        draft.isLoading = false;
        break;
      case LOAD_USER_DATA:
        draft.isLoading = true;
        break;
      case LOAD_USER_DATA_SUCCESS:
        draft.name = action.name;
        draft.surname = action.surname;
        draft.email = action.email;
        draft.currencyId = action.currencyId;
        draft.isLoading = false;
        break;
      case CHANGE_NEW_NAME:
        draft.newName = action.name;
        draft.name = '';
        draft.error = '';
        draft.errorName = '';
        draft.message = '';
        break;
      case ENTER_NEW_NAME:
        draft.newName = action.name;
        break;
      case ENTER_NEW_NAME_SUCCESS:
        draft.name = draft.newName;
        break;
      case ENTER_NEW_NAME_ERROR:
        draft.errorName = action.error;
        draft.isLoading = false;
        break;
      case CHANGE_NEW_SURNAME:
        draft.newSurname = action.surname;
        draft.surname = '';
        draft.errorSurname = '';
        draft.error = '';
        draft.message = '';
        break;
      case ENTER_NEW_SURNAME:
        draft.newSurname = action.surname;
        break;
      case ENTER_NEW_SURNAME_SUCCESS:
        draft.surname = draft.newSurname;
        break;
      case ENTER_NEW_SURNAME_ERROR:
        draft.errorSurname = action.error;
        draft.isLoading = false;
        break;
      case CHANGE_NEW_PASSWORD:
        draft.newPassword = action.password;
        draft.errorPassword = '';
        draft.error = '';
        draft.message = '';
        break;
      case CHANGE_NEW_EMAIL:
        draft.newEmail = action.email;
        draft.email = '';
        draft.errorEmail = '';
        draft.error = '';
        draft.message = '';
        break;
      case ENTER_NEW_EMAIL:
        draft.newEmail = action.email;
        break;
      case ENTER_NEW_EMAIL_SUCCESS:
        draft.email = draft.newEmail;
        break;
      case ENTER_NEW_EMAIL_ERROR:
        draft.errorEmail = action.error;
        draft.isLoading = false;
        break;
      case ENTER_NEW_CURRENCY:
        draft.isLoading = true;
        break;
      case ENTER_NEW_CURRENCY_SUCCESS:
        draft.isLoading = false;
        draft.currencyId = draft.newCurrencyId;
        draft.isOpenAlert = false;
        draft.currencyMessage = action.message;
        break;
      case SAVE_DATA:
        draft.isLoading = true;
        break;
      case SAVE_DATA_SUCCESS:
        draft.isLoading = false;
        draft.message = action.message;
        break;
      case SAVE_DATA_ERROR:
        draft.isLoading = false;
        draft.error = action.error;
        break;
      case LOAD_CURRENCY_SUCCESS:
        draft.currency = action.currency;
        break;
      case CHANGE_NEW_CURRENCY:
        draft.isOpenAlert = true;
        draft.newCurrencyId = action.currencyId;
        draft.currencyMessage = '';
        break;
      case TOGGLE_ALERT_CURRENCY:
        draft.isOpenAlert = !draft.isOpenAlert;
        break;
    }
  });

export default settingsPageReducer;
