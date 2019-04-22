/*
 *
 * PaymentPage actions
 *
 */

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
} from './constants';

export function getCurrencyAction() {
  return {
    type: GET_CURRENCY,
  };
}

export function getCurrencySuccessAction(currency) {
  return {
    type: GET_CURRENCY_SUCCESS,
    currency,
  };
}

export function getCurrencyErrorAction(error) {
  return {
    type: GET_CURRENCY_ERROR,
    error,
  };
}

export function emptyAccountNumberAction(error) {
  return {
    type: EMPTY_ACCOUNT_NUMBER_ERROR,
    error,
  };
}

export function emptyAmountNumberAction(error) {
  return {
    type: EMPTY_AMOUNT_MONEY_ERROR,
    error,
  };
}

export function emptyTransferTitleAction(error) {
  return {
    type: EMPTY_TRANSFER_TITLE_ERROR,
    error,
  };
}

export function emptyAuthorizationKeyAction(error) {
  return {
    type: EMPTY_AUTHORIZATION_KEY_ERROR,
    error,
  };
}

export function changeAccountNumberAction(value) {
  return {
    type: CHANGE_ACCOUNT_NUMBER,
    value,
  };
}

export function searchAccountBillsAction(value) {
  return {
    type: SEARCH_ACCOUNT_BILLS,
    value,
  };
}

export function searchAccountBillsSuccessAction(suggestions) {
  return {
    type: SEARCH_ACCOUNT_BILLS_SUCCESS,
    suggestions,
  };
}

export function searchAccountBillsErrorAction(error) {
  return {
    type: SEARCH_ACCOUNT_BILLS_ERROR,
    error,
  };
}

export function clearAccountBillsAction() {
  return {
    type: CLEAR_ACCOUNT_BILLS,
  };
}

export function enterAccountNumberAction(value) {
  return {
    type: ENTER_ACCOUNT_NUMBER,
    value,
  };
}

export function successAccountNumberAction(recipientId) {
  return {
    type: ENTER_ACCOUNT_NUMBER_SUCCESS,
    recipientId,
  };
}

export function errorAccountNumberAction(error) {
  return {
    type: ENTER_ACCOUNT_NUMBER_ERROR,
    error,
  };
}

export function changeAmountMoneyAction(amountMoney) {
  return {
    type: CHANGE_AMOUNT_MONEY,
    amountMoney,
  };
}

export function enterAmountMoneyAction(amountMoney) {
  return {
    type: ENTER_AMOUNT_MONEY,
    amountMoney,
  };
}

export function successAmountMoneyAction(amountMoney) {
  return {
    type: ENTER_AMOUNT_MONEY_SUCCESS,
    amountMoney,
  };
}

export function errorAmountMoneyAction(error) {
  return {
    type: ENTER_AMOUNT_MONEY_ERROR,
    error,
  };
}

export function changeTransferTitleAction(transferTitle) {
  return {
    type: CHANGE_TRANSFER_TITLE,
    transferTitle,
  };
}

export function enterTransferTitleAction(transferTitle) {
  return {
    type: ENTER_TRANSFER_TITLE,
    transferTitle,
  };
}

export function successTransferTitleAction(title) {
  return {
    type: ENTER_TRANSFER_TITLE_SUCCESS,
    title,
  };
}

export function errorTransferTitleAction(error) {
  return {
    type: ENTER_TRANSFER_TITLE_ERROR,
    error,
  };
}

export function changeAuthorizationKeyAction(authorizationKey) {
  return {
    type: CHANGE_AUTHORIZATION_KEY,
    authorizationKey,
  };
}

export function enterAuthorizationKeyAction(authorizationKey) {
  return {
    type: ENTER_AUTHORIZATION_KEY,
    authorizationKey,
  };
}

export function successAuthorizationKeyAction(authorizationKey) {
  return {
    type: ENTER_AUTHORIZATION_KEY_SUCCESS,
    authorizationKey,
  };
}

export function errorAuthorizationKeyAction(error) {
  return {
    type: ENTER_AUTHORIZATION_KEY_ERROR,
    error,
  };
}

export function sendAuthorizationKeyAction() {
  return {
    type: SEND_AUTHORIZATION_KEY,
  };
}

export function sendAuthorizationKeySuccessAction(message) {
  return {
    type: SEND_AUTHORIZATION_KEY_SUCCESS,
    message,
  };
}

export function sendAuthorizationKeyErrorAction(error) {
  return {
    type: SEND_AUTHORIZATION_KEY_ERROR,
    error,
  };
}

export function makePaymentAction() {
  return {
    type: MAKE_PAYMENT,
  };
}

export function makePaymentSuccessAction() {
  return {
    type: MAKE_PAYMENT_SUCCESS,
  };
}

export function makePaymentErrorAction(error) {
  return {
    type: MAKE_PAYMENT_ERROR,
    error,
  };
}

export function paymentStepNextAction() {
  return {
    type: PAYMENT_STEP_NEXT,
  };
}

export function paymentStepBackAction() {
  return {
    type: PAYMENT_STEP_BACK,
  };
}
