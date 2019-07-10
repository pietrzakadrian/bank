/*
 *
 * PaymentPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import { LOGOUT_SUCCESS, LOGOUT_ERROR } from 'containers/App/constants';
import { ENTER_NEW_CURRENCY_SUCCESS } from 'containers/SettingsPage/constants';
import {
  CHANGE_ACCOUNT_NUMBER,
  ENTER_ACCOUNT_NUMBER,
  ENTER_ACCOUNT_NUMBER_SUCCESS,
  ENTER_ACCOUNT_NUMBER_ERROR,
  CLEAR_ACCOUNT_BILLS,
  SEARCH_ACCOUNT_BILLS,
  SEARCH_ACCOUNT_BILLS_SUCCESS,
  SEARCH_ACCOUNT_BILLS_ERROR,
  CHANGE_AMOUNT_MONEY,
  ENTER_AMOUNT_MONEY,
  ENTER_AMOUNT_MONEY_SUCCESS,
  ENTER_AMOUNT_MONEY_ERROR,
  CHANGE_TRANSFER_TITLE,
  ENTER_TRANSFER_TITLE,
  ENTER_TRANSFER_TITLE_SUCCESS,
  ENTER_TRANSFER_TITLE_ERROR,
  CHANGE_AUTHORIZATION_KEY,
  ENTER_AUTHORIZATION_KEY,
  ENTER_AUTHORIZATION_KEY_SUCCESS,
  ENTER_AUTHORIZATION_KEY_ERROR,
  SEND_AUTHORIZATION_KEY,
  SEND_AUTHORIZATION_KEY_SUCCESS,
  SEND_AUTHORIZATION_KEY_ERROR,
  MAKE_PAYMENT,
  MAKE_PAYMENT_SUCCESS,
  MAKE_PAYMENT_ERROR,
  PAYMENT_STEP_NEXT,
  PAYMENT_STEP_BACK,
  GET_CURRENCY_SUCCESS,
  GET_CURRENCY_ERROR,
  GET_AUTHORIZATION_KEY_SUCCESS,
  GET_AUTHORIZATION_KEY_ERROR,
} from './constants';

export const initialState = {
  accountNumber: '',
  amountMoney: '',
  transferTitle: '',
  authorizationKey: '',
  suggestionAuthorizationKey: '',
  recipientId: '',
  message: '',
  error: '',
  currency: '',
  activeStep: 0,
  suggestions: [],
  isLoading: false,
  isSendAuthorizationKey: false,
};

/* eslint-disable default-case, no-param-reassign */
const paymentPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ENTER_NEW_CURRENCY_SUCCESS:
        draft.currency = '';
        break;
      case LOGOUT_SUCCESS:
        draft.accountNumber = '';
        draft.amountMoney = '';
        draft.transferTitle = '';
        draft.authorizationKey = '';
        draft.suggestionAuthorizationKey = '';
        draft.recipientId = '';
        draft.message = '';
        draft.currency = '';
        draft.error = '';
        draft.activeStep = 0;
        draft.suggestions = [];
        draft.isLoading = false;
        draft.isSendAuthorizationKey = false;
        break;
      case LOGOUT_ERROR:
        draft.accountNumber = '';
        draft.amountMoney = '';
        draft.transferTitle = '';
        draft.authorizationKey = '';
        draft.suggestionAuthorizationKey = '';
        draft.recipientId = '';
        draft.message = '';
        draft.currency = '';
        draft.error = '';
        draft.activeStep = 0;
        draft.suggestions = [];
        draft.isLoading = false;
        draft.isSendAuthorizationKey = false;
        break;
      case LOCATION_CHANGE:
        draft.accountNumber = '';
        draft.amountMoney = '';
        draft.transferTitle = '';
        draft.authorizationKey = '';
        draft.suggestionAuthorizationKey = '';
        draft.recipientId = '';
        draft.message = '';
        draft.error = '';
        draft.activeStep = 0;
        draft.suggestions = [];
        draft.isLoading = false;
        draft.isSendAuthorizationKey = false;
        break;
      case CHANGE_ACCOUNT_NUMBER:
        draft.accountNumber = action.value;
        draft.error = '';
        break;
      case CHANGE_AMOUNT_MONEY:
        draft.amountMoney = action.amountMoney;
        draft.error = '';
        break;
      case CHANGE_TRANSFER_TITLE:
        draft.transferTitle = action.transferTitle;
        draft.error = '';
        break;
      case CHANGE_AUTHORIZATION_KEY:
        draft.authorizationKey = action.authorizationKey;
        draft.error = '';
        break;
      case SEARCH_ACCOUNT_BILLS:
        if (draft.accountNumber !== action.value) {
          draft.suggestions = action.value;
          draft.isLoading = true;
        }
        break;
      case SEARCH_ACCOUNT_BILLS_SUCCESS:
        draft.suggestions = action.suggestions;
        draft.isLoading = false;
        break;
      case SEARCH_ACCOUNT_BILLS_ERROR:
        draft.error = action.error;
        draft.isLoading = false;
        break;
      case CLEAR_ACCOUNT_BILLS:
        draft.suggestions = [];
        break;
      case ENTER_ACCOUNT_NUMBER:
        draft.isLoading = true;
        draft.accountNumber = action.value;
        break;
      case ENTER_ACCOUNT_NUMBER_SUCCESS:
        draft.recipientId = action.recipientId;
        draft.isLoading = false;
        break;
      case ENTER_ACCOUNT_NUMBER_ERROR:
        draft.error = action.error;
        draft.isLoading = false;
        break;
      case ENTER_AMOUNT_MONEY:
        draft.isLoading = true;
        draft.amountMoney = action.amountMoney;
        break;
      case ENTER_AMOUNT_MONEY_SUCCESS:
        draft.isLoading = false;
        break;
      case ENTER_AMOUNT_MONEY_ERROR:
        draft.error = action.error;
        draft.isLoading = false;
        break;
      case ENTER_TRANSFER_TITLE:
        draft.isLoading = true;
        break;
      case ENTER_TRANSFER_TITLE_SUCCESS:
        draft.isLoading = false;
        break;
      case ENTER_TRANSFER_TITLE_ERROR:
        draft.error = action.error;
        break;
      case SEND_AUTHORIZATION_KEY:
        draft.isLoading = true;
        break;
      case SEND_AUTHORIZATION_KEY_SUCCESS:
        draft.isSendAuthorizationKey = true;
        draft.isLoading = false;
        draft.message = action.message;
        break;
      case SEND_AUTHORIZATION_KEY_ERROR:
        draft.error = action.error;
        draft.isLoading = false;
        break;
      case GET_CURRENCY_SUCCESS:
        draft.currency = action.currency;
        break;
      case GET_CURRENCY_ERROR:
        draft.error = action.error;
        break;
      case GET_AUTHORIZATION_KEY_SUCCESS:
        draft.suggestionAuthorizationKey = action.suggestionAuthorizationKey;
        break;
      case GET_AUTHORIZATION_KEY_ERROR:
        draft.error = action.error;
        break;
      case ENTER_AUTHORIZATION_KEY:
        draft.isLoading = true;
        break;
      case ENTER_AUTHORIZATION_KEY_SUCCESS:
        draft.isLoading = false;
        break;
      case ENTER_AUTHORIZATION_KEY_ERROR:
        draft.error = action.error;
        draft.isLoading = false;
        break;
      case MAKE_PAYMENT:
        draft.isLoading = true;
        break;
      case MAKE_PAYMENT_SUCCESS:
        draft.isLoading = false;
        break;
      case MAKE_PAYMENT_ERROR:
        draft.error = action.error;
        draft.isLoading = false;
        break;
      case PAYMENT_STEP_NEXT:
        draft.activeStep += 1;
        break;
      case PAYMENT_STEP_BACK:
        draft.activeStep -= 1;
        draft.isSendAuthorizationKey = false;
        draft.error = '';
        break;
    }
  });

export default paymentPageReducer;
