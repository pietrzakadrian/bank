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
  surmame: '',
  email: '',
  newPassword: '',
  newName: '',
  newSurname: '',
  newEmail: '',
  errorPassword: '',
  errorName: '',
  errorSurname: '',
  errorEmail: '',
  message: '',
  currency: '',
  currencyId: '',
  userCurrencyId: '',
  currencyMessage: '',
  isOpenAlert: false,
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const settingsPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case LOAD_USER_DATA:
        break;
    }
  });

export default settingsPageReducer;
