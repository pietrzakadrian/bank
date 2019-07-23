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
  GET_RECHARTS_COLORS,
  GET_RECHARTS_COLORS_SUCCESS,
  GET_RECHARTS_COLORS_ERROR,
} from './constants';

/**
 * Get user name, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_NAME
 */
export function getNameAction() {
  return {
    type: GET_NAME,
  };
}

/**
 * Dispatched when user name are loaded by the request saga
 *
 * @param  {string} name The name
 *
 * @return {object} An action object with a type of GET_NAME_SUCCESS passing the repos
 */
export function getNameSuccessAction(name) {
  return {
    type: GET_NAME_SUCCESS,
    name,
  };
}

/**
 * Dispatched when loading user name fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_NAME_ERROR passing the repos
 */
export function getNameErrorAction(error) {
  return {
    type: GET_NAME_ERROR,
    error,
  };
}

/**
 * Get user surname, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_SURNAME
 */
export function getSurnameAction() {
  return {
    type: GET_SURNAME,
  };
}

/**
 * Dispatched when user surname are loaded by the request saga
 *
 * @param  {string} surname The surname
 *
 * @return {object} An action object with a type of GET_SURNAME_SUCCESS passing the repos
 */
export function getSurnameSuccessAction(surname) {
  return {
    type: GET_SURNAME_SUCCESS,
    surname,
  };
}

/**
 * Dispatched when loading user surname fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_SURNAME_ERROR passing the repos
 */
export function getSurnameErrorAction(error) {
  return {
    type: GET_SURNAME_ERROR,
    error,
  };
}

/**
 * Get user email, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_EMAIL
 */
export function getEmailAction() {
  return {
    type: GET_EMAIL,
  };
}

/**
 * Dispatched when user email are loaded by the request saga
 *
 * @param  {string} email The email
 *
 * @return {object} An action object with a type of GET_EMAIL_SUCCESS passing the repos
 */
export function getEmailSuccessAction(email) {
  return {
    type: GET_EMAIL_SUCCESS,
    email,
  };
}

/**
 * Dispatched when loading user email fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_EMAIL_ERROR passing the repos
 */
export function getEmailErrorAction(error) {
  return {
    type: GET_EMAIL_ERROR,
    error,
  };
}

/**
 * Get user currency, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_CURRENCY
 */
export function getCurrencyAction() {
  return {
    type: GET_CURRENCY,
  };
}

/**
 * Dispatched when user currency are loaded by the request saga
 *
 * @param  {string} currency The currency
 *
 * @return {object} An action object with a type of GET_CURRENCY_SUCCESS passing the repos
 */
export function getCurrencySuccessAction(currency) {
  return {
    type: GET_CURRENCY_SUCCESS,
    currency,
  };
}

/**
 * Dispatched when loading user currency fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_CURRENCY_ERROR passing the repos
 */
export function getCurrencyErrorAction(error) {
  return {
    type: GET_CURRENCY_ERROR,
    error,
  };
}

/**
 * Get user currency id, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_CURRENCY
 */
export function getCurrencyIdAction() {
  return {
    type: GET_CURRENCY_ID,
  };
}

/**
 * Dispatched when user currency id are loaded by the request saga
 *
 * @param  {number} currencyId The currency id
 *
 * @return {object} An action object with a type of GET_CURRENCY_ID_SUCCESS passing the repos
 */
export function getCurrencyIdSuccessAction(currencyId) {
  return {
    type: GET_CURRENCY_ID_SUCCESS,
    currencyId,
  };
}

/**
 * Dispatched when loading user currency id fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_CURRENCY_ID_ERROR passing the repos
 */
export function getCurrencyIdErrorAction(error) {
  return {
    type: GET_CURRENCY_ID_ERROR,
    error,
  };
}

/**
 * Get last present logged date of user, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_LAST_PRESENT_LOGGED
 */
export function getLastPresentLoggedAction() {
  return {
    type: GET_LAST_PRESENT_LOGGED,
  };
}

/**
 * Dispatched when last present logged date of user are loaded by the request saga
 *
 * @param  {string} lastPresentLogged The last present logged date
 *
 * @return {object} An action object with a type of GET_LAST_PRESENT_LOGGED_SUCCESS passing the repos
 */
export function getLastPresentLoggedSuccessAction(lastPresentLogged) {
  return {
    type: GET_LAST_PRESENT_LOGGED_SUCCESS,
    lastPresentLogged,
  };
}

/**
 * Dispatched when loading last present logged date of user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_LAST_PRESENT_LOGGED_ERROR passing the repos
 */
export function getLastPresentLoggedErrorAction(error) {
  return {
    type: GET_LAST_PRESENT_LOGGED_ERROR,
    error,
  };
}

/**
 * Get last successful logged date of user, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_LAST_SUCCESSFUL_LOGGED
 */
export function getLastSuccessfulLoggedAction() {
  return {
    type: GET_LAST_SUCCESSFUL_LOGGED,
  };
}

/**
 * Dispatched when last successful logged date of user are loaded by the request saga
 *
 * @param  {string} lastSuccessfulLogged The last successful logged date
 *
 * @return {object} An action object with a type of GET_LAST_SUCCESSFUL_LOGGED_SUCCESS passing the repos
 */
export function getLastSuccessfulLoggedSuccessAction(lastSuccessfulLogged) {
  return {
    type: GET_LAST_SUCCESSFUL_LOGGED_SUCCESS,
    lastSuccessfulLogged,
  };
}

/**
 * Dispatched when loading last present logged date of user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_LAST_SUCCESSFUL_LOGGED_ERROR passing the repos
 */
export function getLastSuccessfulLoggedErrorAction(error) {
  return {
    type: GET_LAST_SUCCESSFUL_LOGGED_ERROR,
    error,
  };
}

/**
 * Get last failed logged date of user, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_LAST_FAILED_LOGGED
 */
export function getLastFailedLoggedAction() {
  return {
    type: GET_LAST_FAILED_LOGGED,
  };
}

/**
 * Dispatched when last failed logged date of user are loaded by the request saga
 *
 * @param  {string} lastFailedLogged The last failed logged date
 *
 * @return {object} An action object with a type of GET_LAST_FAILED_LOGGED_SUCCESS passing the repos
 */
export function getLastFailedLoggedSuccessAction(lastFailedLogged) {
  return {
    type: GET_LAST_FAILED_LOGGED_SUCCESS,
    lastFailedLogged,
  };
}

/**
 * Dispatched when loading last failed logged date of user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_LAST_FAILED_LOGGED_ERROR passing the repos
 */
export function getLastFailedLoggedErrorAction(error) {
  return {
    type: GET_LAST_FAILED_LOGGED_ERROR,
    error,
  };
}

/**
 * Get available funds of user, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_AVAILABLE_FUNDS
 */
export function getAvailableFundsAction() {
  return {
    type: GET_AVAILABLE_FUNDS,
  };
}

/**
 * Dispatched when the available funds of user are loaded by the request saga
 *
 * @param  {string} availableFunds The available funds
 *
 * @return {object} An action object with a type of GET_AVAILABLE_FUNDS_SUCCESS passing the repos
 */
export function getAvailableFundsSuccessAction(availableFunds) {
  return {
    type: GET_AVAILABLE_FUNDS_SUCCESS,
    availableFunds,
  };
}

/**
 * Dispatched when loading the available funds of user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_AVAILABLE_FUNDS_ERROR passing the repos
 */
export function getAvailableFundsErrorAction(error) {
  return {
    type: GET_AVAILABLE_FUNDS_ERROR,
    error,
  };
}

/**
 * Get account bills of user, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_ACCOUNT_BILLS
 */
export function getAccountBillsAction() {
  return {
    type: GET_ACCOUNT_BILLS,
  };
}

/**
 * Dispatched when the account bills of user are loaded by the request saga
 *
 * @param  {string} accountBills The account bills
 *
 * @return {object} An action object with a type of GET_ACCOUNT_BILLS_SUCCESS passing the repos
 */
export function getAccountBillsSuccessAction(accountBills) {
  return {
    type: GET_ACCOUNT_BILLS_SUCCESS,
    accountBills,
  };
}

/**
 * Dispatched when loading the account bills of user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_ACCOUNT_BILLS_ERROR passing the repos
 */
export function getAccountBillsErrorAction(error) {
  return {
    type: GET_ACCOUNT_BILLS_ERROR,
    error,
  };
}

/**
 * Get savings of user, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_SAVINGS
 */
export function getSavingsAction() {
  return {
    type: GET_SAVINGS,
  };
}

/**
 * Dispatched when the savings of user are loaded by the request saga
 *
 * @param  {string} savings The savings
 *
 * @return {object} An action object with a type of GET_SAVINGS_SUCCESS passing the repos
 */
export function getSavingsSuccessAction(savings) {
  return {
    type: GET_SAVINGS_SUCCESS,
    savings,
  };
}

/**
 * Get the account balance history of user, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_ACCOUNT_BALANCE_HISTORY
 */
export function getAccountBalanceHistoryAction() {
  return {
    type: GET_ACCOUNT_BALANCE_HISTORY,
  };
}

/**
 * Dispatched when the account balance history of user are loaded by the request saga
 *
 * @param  {array} accountBalanceHistory The account balance history
 *
 * @return {object} An action object with a type of GET_SAVINGS_SUCCESS passing the repos
 */
export function getAccountBalanceHistorySuccessAction(accountBalanceHistory) {
  return {
    type: GET_ACCOUNT_BALANCE_HISTORY_SUCCESS,
    accountBalanceHistory,
  };
}

/**
 * Dispatched when loading the account balance history of user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_ACCOUNT_BALANCE_HISTORY_ERROR passing the repos
 */
export function getAccountBalanceHistoryErrorAction(error) {
  return {
    type: GET_ACCOUNT_BALANCE_HISTORY_ERROR,
    error,
  };
}

/**
 * Get the recent transactions sender of user, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_RECENT_TRANSACTIONS_SENDER
 */
export function getRecentTransactionsSenderAction() {
  return {
    type: GET_RECENT_TRANSACTIONS_SENDER,
  };
}

/**
 * Dispatched when the recent transactions sender of user are loaded by the request saga
 *
 * @param  {array} recentTransactionsSender The recent transactions sender
 *
 * @return {object} An action object with a type of GET_RECENT_TRANSACTIONS_SENDER_SUCCESS passing the repos
 */
export function getRecentTransactionsSenderSuccessAction(
  recentTransactionsSender,
) {
  return {
    type: GET_RECENT_TRANSACTIONS_SENDER_SUCCESS,
    recentTransactionsSender,
  };
}

/**
 * Dispatched when loading the recent transactions sender of user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_RECENT_TRANSACTIONS_SENDER_ERROR passing the repos
 */
export function getRecentTransactionsSenderErrorAction(error) {
  return {
    type: GET_RECENT_TRANSACTIONS_SENDER_ERROR,
    error,
  };
}

/**
 * Get the recent transactions recipient of user, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_RECENT_TRANSACTIONS_RECIPIENT
 */
export function getRecentTransactionsRecipientAction() {
  return {
    type: GET_RECENT_TRANSACTIONS_RECIPIENT,
  };
}

/**
 * Dispatched when the recent transactions recipient of user are loaded by the request saga
 *
 * @param  {array} recentTransactionsRecipient The recent transactions recipient
 *
 * @return {object} An action object with a type of GET_RECENT_TRANSACTIONS_RECIPIENT_SUCCESS passing the repos
 */
export function getRecentTransactionsRecipientSuccessAction(
  recentTransactionsRecipient,
) {
  return {
    type: GET_RECENT_TRANSACTIONS_RECIPIENT_SUCCESS,
    recentTransactionsRecipient,
  };
}

/**
 * Dispatched when loading the recent transactions recipient of user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_RECENT_TRANSACTIONS_RECIPIENT_ERROR passing the repos
 */
export function getRecentTransactionsRecipientErrorAction(error) {
  return {
    type: GET_RECENT_TRANSACTIONS_RECIPIENT_ERROR,
    error,
  };
}

/**
 * Get incoming transfers sum of user, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_INCOMING_TRANSFERS_SUM
 */
export function getIncomingTransfersSumAction() {
  return {
    type: GET_INCOMING_TRANSFERS_SUM,
  };
}

/**
 * Dispatched when the incoming transfers sum of user are loaded by the request saga
 *
 * @param  {number} incomingTransfersSum The incoming transfers sum
 *
 * @return {object} An action object with a type of GET_INCOMING_TRANSFERS_SUM_SUCCESS passing the repos
 */
export function getIncomingTransfersSumSuccessAction(incomingTransfersSum) {
  return {
    type: GET_INCOMING_TRANSFERS_SUM_SUCCESS,
    incomingTransfersSum,
  };
}

/**
 * Dispatched when loading the incoming transfers sum of user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_INCOMING_TRANSFERS_SUM_ERROR passing the repos
 */
export function getIncomingTransfersSumErrorAction(error) {
  return {
    type: GET_INCOMING_TRANSFERS_SUM_ERROR,
    error,
  };
}

/**
 * Get outgoing transfers sum of user, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_OUTGOING_TRANSFERS_SUM
 */
export function getOutgoingTransfersSumAction() {
  return {
    type: GET_OUTGOING_TRANSFERS_SUM,
  };
}

/**
 * Dispatched when the outgoing transfers sum of user are loaded by the request saga
 *
 * @param  {number} outgoingTransfersSum The outgoing transfers sum
 *
 * @return {object} An action object with a type of GET_OUTGOING_TRANSFERS_SUM_SUCCESS passing the repos
 */
export function getOutgoingTransfersSumSuccessAction(outgoingTransfersSum) {
  return {
    type: GET_OUTGOING_TRANSFERS_SUM_SUCCESS,
    outgoingTransfersSum,
  };
}

/**
 * Dispatched when loading the outgoing transfers sum of user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_OUTGOING_TRANSFERS_SUM_ERROR passing the repos
 */
export function getOutgoingTransfersSumErrorAction(error) {
  return {
    type: GET_OUTGOING_TRANSFERS_SUM_ERROR,
    error,
  };
}

/**
 * Get recharts data, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_RECHARTS_DATA
 */
export function getRechartsDataAction() {
  return {
    type: GET_RECHARTS_DATA,
  };
}

/**
 * Dispatched when the recharts data are loaded by the request saga
 *
 * @param  {array} rechartsData The recharts data
 *
 * @return {object} An action object with a type of GET_RECHARTS_DATA_SUCCESS passing the repos
 */
export function getRechartsDataSuccessAction(rechartsData) {
  return {
    type: GET_RECHARTS_DATA_SUCCESS,
    rechartsData,
  };
}

/**
 * Get recharts colors, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_RECHARTS_COLORS
 */
export function getRechartsColorsAction() {
  return {
    type: GET_RECHARTS_COLORS,
  };
}

/**
 * Dispatched when the recharts colors are loaded by the request saga
 *
 * @param  {array} rechartsColors The recharts colors
 *
 * @return {object} An action object with a type of GET_RECHARTS_COLORS_SUCCESS passing the repos
 */
export function getRechartsColorsSuccessAction(rechartsColors) {
  return {
    type: GET_RECHARTS_COLORS_SUCCESS,
    rechartsColors,
  };
}

/**
 * Dispatched when loading the recharts colors fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_RECHARTS_COLORS_ERROR passing the repos
 */
export function getRechartsColorsErrorAction(error) {
  return {
    type: GET_RECHARTS_COLORS_ERROR,
    error,
  };
}
