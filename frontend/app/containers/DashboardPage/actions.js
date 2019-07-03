/*
 *
 * DashboardPage actions
 *
 */

import {
  GET_NAME,
  GET_NAME_SUCCESS,
  GET_NAME_ERROR,
  GET_SURNAME,
  GET_SURNAME_SUCCESS,
  GET_SURNAME_ERROR,
  GET_EMAIL,
  GET_EMAIL_SUCCESS,
  GET_EMAIL_ERROR,
  GET_LAST_PRESENT_LOGGED,
  GET_LAST_PRESENT_LOGGED_SUCCESS,
  GET_LAST_PRESENT_LOGGED_ERROR,
  GET_LAST_SUCCESSFUL_LOGGED,
  GET_LAST_SUCCESSFUL_LOGGED_SUCCESS,
  GET_LAST_SUCCESSFUL_LOGGED_ERROR,
  GET_LAST_FAILED_LOGGED,
  GET_LAST_FAILED_LOGGED_SUCCESS,
  GET_LAST_FAILED_LOGGED_ERROR,
  GET_AVAILABLE_FUNDS,
  GET_AVAILABLE_FUNDS_SUCCESS,
  GET_AVAILABLE_FUNDS_ERROR,
  GET_ACCOUNT_BILLS,
  GET_ACCOUNT_BILLS_SUCCESS,
  GET_ACCOUNT_BILLS_ERROR,
  GET_ACCOUNT_BALANCE_HISTORY,
  GET_ACCOUNT_BALANCE_HISTORY_SUCCESS,
  GET_ACCOUNT_BALANCE_HISTORY_ERROR,
  GET_SAVINGS,
  GET_SAVINGS_SUCCESS,
  GET_SAVINGS_ERROR,
  GET_RECENT_TRANSACTIONS_SENDER,
  GET_RECENT_TRANSACTIONS_SENDER_SUCCESS,
  GET_RECENT_TRANSACTIONS_SENDER_ERROR,
  GET_RECENT_TRANSACTIONS_RECIPIENT,
  GET_RECENT_TRANSACTIONS_RECIPIENT_SUCCESS,
  GET_RECENT_TRANSACTIONS_RECIPIENT_ERROR,
  GET_OUTGOING_TRANSFERS_SUM,
  GET_OUTGOING_TRANSFERS_SUM_SUCCESS,
  GET_OUTGOING_TRANSFERS_SUM_ERROR,
  GET_INCOMING_TRANSFERS_SUM,
  GET_INCOMING_TRANSFERS_SUM_SUCCESS,
  GET_INCOMING_TRANSFERS_SUM_ERROR,
  GET_CURRENCY,
  GET_CURRENCY_SUCCESS,
  GET_CURRENCY_ERROR,
  GET_CURRENCY_ID,
  GET_CURRENCY_ID_SUCCESS,
  GET_CURRENCY_ID_ERROR,
  GET_RECHARTS_DATA,
  GET_RECHARTS_DATA_SUCCESS,
  GET_RECHARTS_DATA_ERROR,
  GET_RECHARTS_COLORS,
  GET_RECHARTS_COLORS_SUCCESS,
  GET_RECHARTS_COLORS_ERROR,
} from './constants';

export function getNameAction() {
  return {
    type: GET_NAME,
  };
}

export function getNameSuccessAction(name) {
  return {
    type: GET_NAME_SUCCESS,
    name,
  };
}

export function getNameErrorAction(error) {
  return {
    type: GET_NAME_ERROR,
    error,
  };
}

export function getSurnameAction() {
  return {
    type: GET_SURNAME,
  };
}

export function getSurnameSuccessAction(surname) {
  return {
    type: GET_SURNAME_SUCCESS,
    surname,
  };
}

export function getSurnameErrorAction(error) {
  return {
    type: GET_SURNAME_ERROR,
    error,
  };
}

export function getEmailAction() {
  return {
    type: GET_EMAIL,
  };
}

export function getEmailSuccessAction(email) {
  return {
    type: GET_EMAIL_SUCCESS,
    email,
  };
}

export function getEmailErrorAction(error) {
  return {
    type: GET_EMAIL_ERROR,
    error,
  };
}

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

export function getCurrencyIdAction() {
  return {
    type: GET_CURRENCY_ID,
  };
}

export function getCurrencyIdSuccessAction(currencyId) {
  return {
    type: GET_CURRENCY_ID_SUCCESS,
    currencyId,
  };
}

export function getCurrencyIdErrorAction(error) {
  return {
    type: GET_CURRENCY_ID_ERROR,
    error,
  };
}

export function getLastPresentLoggedAction() {
  return {
    type: GET_LAST_PRESENT_LOGGED,
  };
}

export function getLastPresentLoggedSuccessAction(lastPresentLogged) {
  return {
    type: GET_LAST_PRESENT_LOGGED_SUCCESS,
    lastPresentLogged,
  };
}

export function getLastPresentLoggedErrorAction(error) {
  return {
    type: GET_LAST_PRESENT_LOGGED_ERROR,
    error,
  };
}

export function getLastSuccessfulLoggedAction() {
  return {
    type: GET_LAST_SUCCESSFUL_LOGGED,
  };
}

export function getLastSuccessfulLoggedSuccessAction(lastSuccessfulLogged) {
  return {
    type: GET_LAST_SUCCESSFUL_LOGGED_SUCCESS,
    lastSuccessfulLogged,
  };
}

export function getLastSuccessfulLoggedErrorAction(error) {
  return {
    type: GET_LAST_SUCCESSFUL_LOGGED_ERROR,
    error,
  };
}

export function getLastFailedLoggedAction() {
  return {
    type: GET_LAST_FAILED_LOGGED,
  };
}

export function getLastFailedLoggedSuccessAction(lastFailedLogged) {
  return {
    type: GET_LAST_FAILED_LOGGED_SUCCESS,
    lastFailedLogged,
  };
}

export function getLastFailedLoggedErrorAction(error) {
  return {
    type: GET_LAST_FAILED_LOGGED_ERROR,
    error,
  };
}

export function getAvailableFundsAction() {
  return {
    type: GET_AVAILABLE_FUNDS,
  };
}

export function getAvailableFundsSuccessAction(availableFunds) {
  return {
    type: GET_AVAILABLE_FUNDS_SUCCESS,
    availableFunds,
  };
}

export function getAvailableFundsErrorAction(error) {
  return {
    type: GET_AVAILABLE_FUNDS_ERROR,
    error,
  };
}

export function getAccountBillsAction() {
  return {
    type: GET_ACCOUNT_BILLS,
  };
}

export function getAccountBillsSuccessAction(accountBills) {
  return {
    type: GET_ACCOUNT_BILLS_SUCCESS,
    accountBills,
  };
}

export function getAccountBillsErrorAction(error) {
  return {
    type: GET_ACCOUNT_BILLS_ERROR,
    error,
  };
}

export function getSavingsAction() {
  return {
    type: GET_SAVINGS,
  };
}

export function getSavingsSuccessAction(savings) {
  return {
    type: GET_SAVINGS_SUCCESS,
    savings,
  };
}

export function getSavingsErrorAction(error) {
  return {
    type: GET_SAVINGS_ERROR,
    error,
  };
}

export function getAccountBalanceHistoryAction() {
  return {
    type: GET_ACCOUNT_BALANCE_HISTORY,
  };
}

export function getAccountBalanceHistorySuccessAction(accountBalanceHistory) {
  return {
    type: GET_ACCOUNT_BALANCE_HISTORY_SUCCESS,
    accountBalanceHistory,
  };
}

export function getAccountBalanceHistoryErrorAction(error) {
  return {
    type: GET_ACCOUNT_BALANCE_HISTORY_ERROR,
    error,
  };
}

export function getRecentTransactionsSenderAction() {
  return {
    type: GET_RECENT_TRANSACTIONS_SENDER,
  };
}

export function getRecentTransactionsSenderSuccessAction(
  recentTransactionsSender,
) {
  return {
    type: GET_RECENT_TRANSACTIONS_SENDER_SUCCESS,
    recentTransactionsSender,
  };
}

export function getRecentTransactionsSenderErrorAction(error) {
  return {
    type: GET_RECENT_TRANSACTIONS_SENDER_ERROR,
    error,
  };
}

export function getRecentTransactionsRecipientAction() {
  return {
    type: GET_RECENT_TRANSACTIONS_RECIPIENT,
  };
}

export function getRecentTransactionsRecipientSuccessAction(
  recentTransactionsRecipient,
) {
  return {
    type: GET_RECENT_TRANSACTIONS_RECIPIENT_SUCCESS,
    recentTransactionsRecipient,
  };
}

export function getRecentTransactionsRecipientErrorAction(error) {
  return {
    type: GET_RECENT_TRANSACTIONS_RECIPIENT_ERROR,
    error,
  };
}

export function getIncomingTransfersSumAction() {
  return {
    type: GET_INCOMING_TRANSFERS_SUM,
  };
}

export function getIncomingTransfersSumSuccessAction(incomingTransfersSum) {
  return {
    type: GET_INCOMING_TRANSFERS_SUM_SUCCESS,
    incomingTransfersSum,
  };
}

export function getIncomingTransfersSumErrorAction(error) {
  return {
    type: GET_INCOMING_TRANSFERS_SUM_ERROR,
    error,
  };
}

export function getOutgoingTransfersSumAction() {
  return {
    type: GET_OUTGOING_TRANSFERS_SUM,
  };
}

export function getOutgoingTransfersSumSuccessAction(outgoingTransfersSum) {
  return {
    type: GET_OUTGOING_TRANSFERS_SUM_SUCCESS,
    outgoingTransfersSum,
  };
}

export function getOutgoingTransfersSumErrorAction(error) {
  return {
    type: GET_OUTGOING_TRANSFERS_SUM_ERROR,
    error,
  };
}

export function getRechartsDataAction() {
  return {
    type: GET_RECHARTS_DATA,
  };
}

export function getRechartsDataSuccessAction(rechartsData) {
  return {
    type: GET_RECHARTS_DATA_SUCCESS,
    rechartsData,
  };
}

export function getRechartsDataErrorAction(error) {
  return {
    type: GET_RECHARTS_DATA_ERROR,
    error,
  };
}

export function getRechartsColorsAction() {
  return {
    type: GET_RECHARTS_COLORS,
  };
}

export function getRechartsColorsSuccessAction(rechartsColors) {
  return {
    type: GET_RECHARTS_COLORS_SUCCESS,
    rechartsColors,
  };
}

export function getRechartsColorsErrorAction(error) {
  return {
    type: GET_RECHARTS_COLORS_ERROR,
    error,
  };
}
