/*
 *
 * SettingsPage reducer
 *
 */
import produce from 'immer';
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
  currencyMessage: '',
  isOpenAlert: false,
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const settingsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
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
      case ENTER_NEW_EMAIL_ERROR:
        draft.errorEmail = action.error;
        draft.isLoading = false;
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
    }
  });

export default settingsPageReducer;
