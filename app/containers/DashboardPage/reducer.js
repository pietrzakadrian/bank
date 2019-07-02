/*
 *
 * DashboardPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import { LOGOUT_SUCCESS, LOGOUT_ERROR } from 'containers/App/constants';
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
  GET_SAVINGS,
  GET_SAVINGS_SUCCESS,
  GET_SAVINGS_ERROR,
} from './constants';

export const initialState = {
  name: '',
  surname: '',
  email: '',
  lastPresentLogged: '',
  lastSuccessfulLogged: '',
  lastFailedLogged: '',
  availableFunds: '',
  accountBills: '',
  accountBalanceHistory: '',
  savings: '',
  recentTransactionsSender: '',
  recentTransactionsRecipient: '',
  outgoingTransfersSum: '',
  incomingTransfersSum: '',
  currency: '',
  rechartsColors: '',
  rechartsData: '',
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const dashboardPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGOUT_SUCCESS:
        draft.name = '';
        draft.surname = '';
        draft.email = '';
        draft.lastPresentLogged = '';
        draft.lastSuccessfulLogged = '';
        draft.lastFailedLogged = '';
        draft.availableFunds = '';
        draft.accountBills = '';
        draft.accountBalanceHistory = '';
        draft.savings = '';
        draft.recentTransactionsSender = '';
        draft.recentTransactionsRecipient = '';
        draft.outgoingTransfersSum = '';
        draft.incomingTransfersSum = '';
        draft.currency = '';
        draft.rechartsColors = '';
        draft.rechartsData = '';
        draft.error = '';
        break;
      case LOGOUT_ERROR:
        draft.name = '';
        draft.surname = '';
        draft.email = '';
        draft.lastPresentLogged = '';
        draft.lastSuccessfulLogged = '';
        draft.lastFailedLogged = '';
        draft.availableFunds = '';
        draft.accountBills = '';
        draft.accountBalanceHistory = '';
        draft.savings = '';
        draft.recentTransactionsSender = '';
        draft.recentTransactionsRecipient = '';
        draft.outgoingTransfersSum = '';
        draft.incomingTransfersSum = '';
        draft.currency = '';
        draft.rechartsColors = '';
        draft.rechartsData = '';
        draft.error = '';
        break;
      case GET_NAME_SUCCESS:
        draft.name = action.name;
        break;
      case GET_NAME_ERROR:
        draft.error = action.error;
        break;
      case GET_SURNAME_SUCCESS:
        draft.surname = action.surname;
        break;
      case GET_SURNAME_ERROR:
        draft.error = action.error;
        break;
      case GET_EMAIL_SUCCESS:
        draft.email = action.email;
        break;
      case GET_EMAIL_ERROR:
        draft.error = action.error;
        break;
      case GET_LAST_PRESENT_LOGGED_SUCCESS:
        draft.lastPresentLogged = action.lastPresentLogged;
        break;
      case GET_LAST_PRESENT_LOGGED_ERROR:
        draft.error = action.error;
        break;
      case GET_LAST_SUCCESSFUL_LOGGED_SUCCESS:
        draft.lastSuccessfulLogged = action.lastSuccessfulLogged;
        break;
      case GET_LAST_SUCCESSFUL_LOGGED_ERROR:
        draft.error = action.error;
        break;
      case GET_LAST_FAILED_LOGGED_SUCCESS:
        draft.lastFailedLogged = action.lastFailedLogged;
        break;
      case GET_LAST_FAILED_LOGGED_ERROR:
        draft.error = action.error;
        break;
      case GET_AVAILABLE_FUNDS_SUCCESS:
        draft.availableFunds = action.availableFunds;
        break;
      case GET_AVAILABLE_FUNDS_ERROR:
        draft.error = action.error;
        break;
      case GET_ACCOUNT_BILLS_SUCCESS:
        draft.accountBills = action.accountBills;
        break;
      case GET_ACCOUNT_BILLS_ERROR:
        draft.error = action.error;
        break;
      case GET_ACCOUNT_BALANCE_HISTORY_SUCCESS:
        draft.accountBalanceHistory = action.accountBalanceHistory;
        break;
      case GET_ACCOUNT_BALANCE_HISTORY_ERROR:
        draft.error = action.error;
        break;
      case GET_RECENT_TRANSACTIONS_SENDER_SUCCESS:
        draft.recentTransactionsSender = action.recentTransactionsSender;
        break;
      case GET_RECENT_TRANSACTIONS_SENDER_ERROR:
        draft.error = action.error;
        break;
      case GET_RECENT_TRANSACTIONS_RECIPIENT_SUCCESS:
        draft.recentTransactionsRecipient = action.recentTransactionsRecipient;
        break;
      case GET_RECENT_TRANSACTIONS_RECIPIENT_ERROR:
        draft.error = action.error;
        break;
      case GET_OUTGOING_TRANSFERS_SUM_SUCCESS:
        draft.outgoingTransfersSum = action.outgoingTransfersSum;
        break;
      case GET_OUTGOING_TRANSFERS_SUM_ERROR:
        draft.error = action.error;
        break;
      case GET_INCOMING_TRANSFERS_SUM_SUCCESS:
        draft.incomingTransfersSum = action.incomingTransfersSum;
        break;
      case GET_INCOMING_TRANSFERS_SUM_ERROR:
        draft.error = action.error;
        break;
      case GET_CURRENCY_SUCCESS:
        draft.currency = action.currency;
        break;
      case GET_CURRENCY_ERROR:
        draft.error = action.error;
        break;
      case GET_CURRENCY_ID_SUCCESS:
        draft.currencyId = action.currencyId;
        break;
      case GET_CURRENCY_ID_ERROR:
        draft.error = action.error;
        break;
      case GET_RECHARTS_DATA_SUCCESS:
        draft.rechartsData = action.rechartsData;
        break;
      case GET_RECHARTS_DATA_ERROR:
        draft.error = action.error;
        break;
      case GET_RECHARTS_COLORS_SUCCESS:
        draft.rechartsColors = action.rechartsColors;
        break;
      case GET_RECHARTS_COLORS_ERROR:
        draft.error = action.error;
        break;
      case GET_SAVINGS_SUCCESS:
        draft.savings = action.savings;
        break;
      case GET_SAVINGS_ERROR:
        draft.error = action.error;
        break;
    }
  });

export default dashboardPageReducer;
