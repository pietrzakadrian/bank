/*
 *
 * RegisterPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  CHANGE_LOGIN,
  ENTER_LOGIN,
  ENTER_LOGIN_SUCCESS,
  ENTER_LOGIN_ERROR,
  CHANGE_PASSWORD,
  ENTER_PASSWORD,
  ENTER_PASSWORD_SUCCESS,
  ENTER_PASSWORD_ERROR,
  CHANGE_NAME,
  ENTER_NAME,
  ENTER_NAME_SUCCESS,
  ENTER_NAME_ERROR,
  CHANGE_SURNAME,
  ENTER_SURNAME,
  ENTER_SURNAME_SUCCESS,
  ENTER_SURNAME_ERROR,
  LOAD_CURRENCY_SUCCESS,
  LOAD_CURRENCY_ERROR,
  CHANGE_CURRENCY,
  ENTER_CURRENCY,
  ENTER_CURRENCY_SUCCESS,
  ENTER_CURRENCY_ERROR,
  CHANGE_EMAIL,
  ENTER_EMAIL,
  ENTER_EMAIL_SUCCESS,
  ENTER_EMAIL_ERROR,
  TOGGLE_DATA_PROCESSING_AGREEMENT,
  DATA_PROCESSING_AGREEMENT_ERROR,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  STEP_NEXT,
  STEP_BACK,
} from './constants';

export const initialState = {
  login: '',
  password: '',
  name: '',
  surname: '',
  email: '',
  error: '',
  currency: [],
  currencyId: null,
  isDataProcessingAgreement: false,
  errorDataProcessingAgreement: '',
  isLoading: false,
  activeStep: 0,
};

/* eslint-disable default-case, no-param-reassign */
const registerPageReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_LOGIN:
      draft.login = action.login;
      draft.error = '';
      break;
    case ENTER_LOGIN:
      draft.login = action.login;
      draft.isLoading = true;
      break;
    case ENTER_LOGIN_SUCCESS:
      draft.isLoading = false;
      break;
    case ENTER_LOGIN_ERROR:
      draft.error = action.error;
      draft.isLoading = false;
      break;
    case CHANGE_PASSWORD:
      draft.password = action.password;
      draft.error = '';
      break;
    case ENTER_PASSWORD:
      draft.password = action.password;
      draft.isLoading = true;
      break;
    case ENTER_PASSWORD_SUCCESS:
      draft.isLoading = false;
      break;
    case ENTER_PASSWORD_ERROR:
      draft.error = action.error;
      draft.isLoading = false;
      break;
    case CHANGE_NAME:
      draft.name = action.name.trim();
      draft.error = '';
      break;
    case ENTER_NAME:
      draft.name = action.name.trim();
      draft.isLoading = true;
      break;
    case ENTER_NAME_SUCCESS:
      draft.isLoading = false;
      break;
    case ENTER_NAME_ERROR:
      draft.error = action.error;
      draft.isLoading = false;
      break;
    case CHANGE_SURNAME:
      draft.surname = action.surname.trim();
      draft.error = '';
      break;
    case ENTER_SURNAME:
      draft.name = action.surname.trim();
      draft.isLoading = true;
      break;
    case ENTER_SURNAME_SUCCESS:
      draft.isLoading = false;
      break;
    case ENTER_SURNAME_ERROR:
      draft.error = action.error;
      draft.isLoading = false;
      break;
    case LOAD_CURRENCY_SUCCESS:
      draft.currency = action.currency;
      // eslint-disable-next-line prefer-destructuring
      draft.currencyId = action.currency[0];
      break;
    case LOAD_CURRENCY_ERROR:
      draft.error = action.error;
      break;
    case CHANGE_CURRENCY:
      draft.currencyId = action.currencyId;
      draft.error = '';
      break;
    case ENTER_CURRENCY:
      draft.currencyId = action.currencyId;
      draft.isLoading = true;
      break;
    case ENTER_CURRENCY_SUCCESS:
      draft.isLoading = false;
      break;
    case ENTER_CURRENCY_ERROR:
      draft.error = action.error;
      draft.isLoading = false;
      break;
    case CHANGE_EMAIL:
      draft.email = action.email.trim();
      draft.error = '';
      break;
    case ENTER_EMAIL:
      draft.email = action.email.trim();
      draft.isLoading = true;
      break;
    case ENTER_EMAIL_SUCCESS:
      draft.isLoading = false;
      break;
    case ENTER_EMAIL_ERROR:
      draft.error = action.error;
      draft.isLoading = false;
      break;
    case TOGGLE_DATA_PROCESSING_AGREEMENT:
      draft.isDataProcessingAgreement = !draft.isDataProcessingAgreement;
      draft.errorDataProcessingAgreement = '';
      break;
    case DATA_PROCESSING_AGREEMENT_ERROR:
      draft.errorDataProcessingAgreement = action.error;
      draft.isLoading = false;
      break;
    case REGISTER:
      draft.login = action.login;
      draft.password = action.password;
      draft.name = action.name.trim();
      draft.surname = action.surname.trim();
      draft.currencyId = action.currencyId;
      draft.isDataProcessingAgreement = action.isDataProcessingAgreement;
      draft.email = action.email.trim();
      draft.isLoading = true;
      break;
    case REGISTER_SUCCESS:
      draft.isLoading = false;
      draft.login = '';
      draft.password = '';
      draft.name = '';
      draft.surname = '';
      draft.email = '';
      draft.error = '';
      draft.currency = [];
      draft.currencyId = null;
      draft.isDataProcessingAgreement = false;
      draft.errorDataProcessingAgreement = '';
      draft.activeStep = 0;
      break;
    case REGISTER_ERROR:
      draft.error = action.error;
      draft.isLoading = false;
      break;
    case STEP_NEXT:
      draft.activeStep += 1;
      draft.error = '';
      break;
    case STEP_BACK:
      draft.activeStep -= 1;
      draft.error = '';
      draft.errorDataProcessingAgreement = '';
      break;
    case LOCATION_CHANGE:
      draft.login = '';
      draft.password = '';
      draft.name = '';
      draft.surname = '';
      draft.email = '';
      draft.error = '';
      draft.currency = [];
      draft.currencyId = null;
      draft.isDataProcessingAgreement = false;
      draft.errorDataProcessingAgreement = '';
      draft.isLoading = false;
      draft.activeStep = 0;
      break;
  }
}, initialState);

export default registerPageReducer;
