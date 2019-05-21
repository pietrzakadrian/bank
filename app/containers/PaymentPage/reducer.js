/*
 *
 * PaymentPage reducer
 *
 */

import { fromJS } from 'immutable';
import { LOGOUT_SUCCESS } from 'components/App/Header/constants';
import { LOCATION_CHANGE } from 'react-router-redux';
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
  EMPTY_ACCOUNT_NUMBER_ERROR,
  EMPTY_AMOUNT_MONEY_ERROR,
  EMPTY_TRANSFER_TITLE_ERROR,
  EMPTY_AUTHORIZATION_KEY_ERROR,
  GET_CURRENCY,
  GET_CURRENCY_SUCCESS,
  GET_CURRENCY_ERROR,
  GET_AUTHORIZATION_KEY_SUCCESS,
  GET_AUTHORIZATION_KEY_ERROR,
} from './constants';

export const initialState = fromJS({
  suggestions: [],
  amountMoney: null,
  transferTitle: null,
  authorizationKey: null,
  authorizationKeyWithoutMail: null,
  activeStep: 0,
  message: null,
  error: null,
  isLoading: false,
  isAccountBill: false,
  isAmountMoney: false,
  value: '',
  isSendAuthorizationKey: false,
  recipientId: null,
  currency: null,
});

function paymentPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state
        .set('suggestions', [])
        .set('amountMoney', null)
        .set('transferTitle', null)
        .set('authorizationKey', null)
        .set('activeStep', 0)
        .set('message', null)
        .set('error', null)
        .set('isLoading', false)
        .set('isAccountBill', false)
        .set('isAmountMoney', false)
        .set('value', '')
        .set('isSendAuthorizationKey', false)
        .set('recipientId', null)
        .set('currency', null)
        .set('authorizationKeyWithoutMail', null);
    case LOGOUT_SUCCESS:
      return state
        .set('suggestions', [])
        .set('amountMoney', null)
        .set('transferTitle', null)
        .set('authorizationKey', null)
        .set('activeStep', 0)
        .set('message', null)
        .set('error', null)
        .set('isLoading', false)
        .set('isAccountBill', false)
        .set('isAmountMoney', false)
        .set('value', '')
        .set('isSendAuthorizationKey', false)
        .set('recipientId', null)
        .set('currency', null)
        .set('authorizationKeyWithoutMail', null);

    case GET_AUTHORIZATION_KEY_SUCCESS:
      return state.set('authorizationKeyWithoutMail', action.key);

    case GET_AUTHORIZATION_KEY_ERROR:
      return state.set('error', action.error);

    case GET_CURRENCY:
      return state;
    case GET_CURRENCY_SUCCESS:
      return state.set('currency', action.currency);
    case GET_CURRENCY_ERROR:
      return state.set('error', action.error);
    case EMPTY_ACCOUNT_NUMBER_ERROR:
      return state.set('error', action.error);
    case EMPTY_AMOUNT_MONEY_ERROR:
      return state.set('error', action.error);
    case EMPTY_TRANSFER_TITLE_ERROR:
      return state.set('error', action.error);
    case EMPTY_AUTHORIZATION_KEY_ERROR:
      return state.set('error', action.error).set('message', null);
    case CHANGE_ACCOUNT_NUMBER:
      return state
        .set('value', action.value)
        .set('suggestions', [])
        .set('error', null)
        .set('recipientId', null);
    case CLEAR_ACCOUNT_BILLS: {
      return state.set('suggestions', []).set('isLoading', false);
    }
    case SEARCH_ACCOUNT_BILLS: {
      if (action.value === state.get('value')) {
        return state.set('isLoading', false).set('error', null);
      }
      return state
        .set('suggestions', action.suggestions)
        .set('isLoading', true)
        .set('error', null);
    }
    case SEARCH_ACCOUNT_BILLS_SUCCESS:
      return state
        .set('suggestions', action.suggestions)
        .set('isLoading', false);
    case SEARCH_ACCOUNT_BILLS_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case ENTER_ACCOUNT_NUMBER:
      return state.set('value', action.value).set('isLoading', true);
    case ENTER_ACCOUNT_NUMBER_SUCCESS:
      return state
        .set('isAccountBill', true)
        .set('isLoading', false)
        .set('recipientId', action.recipientId);
    case ENTER_ACCOUNT_NUMBER_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case CHANGE_AMOUNT_MONEY:
      return state.set('amountMoney', action.amountMoney).set('error', null);
    case ENTER_AMOUNT_MONEY:
      return state
        .set('amountMoney', action.amountMoney)
        .set('isLoading', true);
    case ENTER_AMOUNT_MONEY_SUCCESS:
      return state.set('isAmountMoney', true).set('isLoading', false);
    case ENTER_AMOUNT_MONEY_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case CHANGE_TRANSFER_TITLE:
      return state
        .set('transferTitle', action.transferTitle)
        .set('error', null);
    case ENTER_TRANSFER_TITLE:
      return state
        .set('transferTitle', action.transferTitle)
        .set('isLoading', true);
    case ENTER_TRANSFER_TITLE_SUCCESS:
      return state.set('isLoading', false);
    case ENTER_TRANSFER_TITLE_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case CHANGE_AUTHORIZATION_KEY:
      return state
        .set('authorizationKey', action.authorizationKey)
        .set('error', null);
    case ENTER_AUTHORIZATION_KEY:
      return state
        .set('authorizationKey', action.authorizationKey)
        .set('isLoading', true);
    case ENTER_AUTHORIZATION_KEY_SUCCESS:
      return state.set('isLoading', false);
    case ENTER_AUTHORIZATION_KEY_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case SEND_AUTHORIZATION_KEY:
      return state;
    case SEND_AUTHORIZATION_KEY_SUCCESS:
      return state
        .set('message', action.message)
        .set('error', null)
        .set('isSendAuthorizationKey', true);
    case SEND_AUTHORIZATION_KEY_ERROR:
      return state.set('error', action.error).set('message', null);
    case MAKE_PAYMENT:
      return state;
    case MAKE_PAYMENT_SUCCESS:
      return state
        .set('isSendAuthorizationKey', false)
        .set('message', null)
        .set('error', null)
        .set('suggestions', [])
        .set('amountMoney', null)
        .set('transferTitle', null)
        .set('authorizationKey', null)
        .set('activeStep', 0)
        .set('isAccountBill', false)
        .set('isAmountMoney', false)
        .set('value', '')
        .set('recipientId', null)
        .set('isLoading', false);

    case MAKE_PAYMENT_ERROR:
      return state
        .set('error', action.error)
        .set('message', null)
        .set('isLoading', false);
    case PAYMENT_STEP_NEXT: {
      return state
        .set('activeStep', state.get('activeStep') + 1)
        .set('error', null);
    }
    case PAYMENT_STEP_BACK: {
      if (state.get('activeStep') === 1 && state.get('value') !== null) {
        return state
          .set('value', '')
          .set('activeStep', state.get('activeStep') - 1)
          .set('error', null)
          .set('recipientId', null);
      }
      if (state.get('activeStep') === 2 && state.get('amountMoney') !== null) {
        return state
          .set('amountMoney', null)
          .set('activeStep', state.get('activeStep') - 1)
          .set('error', null);
      }
      if (
        state.get('activeStep') === 3 &&
        state.get('transferTitle') !== null
      ) {
        return state
          .set('transferTitle', null)
          .set('activeStep', state.get('activeStep') - 1)
          .set('error', null)
          .set('isSendAuthorizationKey', false);
      }
      return state
        .set('activeStep', state.get('activeStep') - 1)
        .set('error', null);
    }
    default:
      return state;
  }
}

export default paymentPageReducer;
