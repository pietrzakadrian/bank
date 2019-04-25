/*
 *
 * DashboardPage reducer
 *
 */

import { fromJS } from 'immutable';
import { MAKE_PAYMENT_SUCCESS } from 'containers/PaymentPage/constants';
import { LOGOUT_SUCCESS } from 'components/App/Header/constants';

import {
  GET_NAME,
  GET_NAME_SUCCESS,
  GET_NAME_ERROR,
  GET_SURNAME,
  GET_SURNAME_SUCCESS,
  GET_SURNAME_ERROR,
  GET_LAST_PRESENT_LOGGED,
  GET_LAST_PRESENT_LOGGED_SUCCESS,
  GET_LAST_PRESENT_LOGGED_ERROR,
  GET_LAST_SUCCESSFUL_LOGGED,
  GET_LAST_SUCCESSFUL_LOGGED_SUCCESS,
  GET_LAST_SUCCESSFUL_LOGGED_ERROR,
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
} from './constants';
import {
  ENTER_NEW_NAME_SUCCESS,
  ENTER_NEW_SURNAME_SUCCESS,
} from '../SettingsPage/constants';

export const initialState = fromJS({
  name: null,
  surname: null,
  lastPresentLogged: null,
  lastSuccessfulLogged: null,
  availableFunds: null,
  accountBills: null,
  accountBalanceHistory: null,
  recentTransactionsSender: null,
  recentTransactionsRecipient: null,
  outgoingTransfersSum: null,
  incomingTransfersSum: null,
  currency: null,
  error: null,
});

function dashboardPageReducer(state = initialState, action) {
  switch (action.type) {
    case ENTER_NEW_NAME_SUCCESS:
      return state.set('name', null);
    case ENTER_NEW_SURNAME_SUCCESS:
      return state.set('surname', null);

    case LOGOUT_SUCCESS:
      return state
        .set('name', null)
        .set('surname', null)
        .set('lastPresentLogged', null)
        .set('lastSuccessfulLogged', null)
        .set('availableFunds', null)
        .set('accountBills', null)
        .set('accountBalanceHistory', null)
        .set('recentTransactionsSender', null)
        .set('recentTransactionsRecipient', null)
        .set('outgoingTransfersSum', null)
        .set('incomingTransfersSum', null)
        .set('error', null)
        .set('currency', null);

    case GET_CURRENCY:
      return state;
    case GET_CURRENCY_SUCCESS:
      return state.set('currency', action.currency);
    case GET_CURRENCY_ERROR:
      return state.set('error', action.error);
    case GET_NAME:
      return state;
    case GET_NAME_SUCCESS:
      return state.set('name', action.name);
    case GET_NAME_ERROR:
      return state.set('error', action.error);
    case GET_SURNAME:
      return state;
    case GET_SURNAME_SUCCESS:
      return state.set('surname', action.surname);
    case GET_SURNAME_ERROR:
      return state.set('error', action.error);
    case GET_LAST_PRESENT_LOGGED:
      return state;
    case GET_LAST_PRESENT_LOGGED_SUCCESS:
      return state.set('lastPresentLogged', action.lastPresentLogged);
    case GET_LAST_PRESENT_LOGGED_ERROR:
      return state.set('error', action.error);
    case GET_LAST_SUCCESSFUL_LOGGED:
      return state;
    case GET_LAST_SUCCESSFUL_LOGGED_SUCCESS:
      return state.set('lastSuccessfulLogged', action.lastSuccessfulLogged);
    case GET_LAST_SUCCESSFUL_LOGGED_ERROR:
      return state.set('error', action.error);
    case GET_AVAILABLE_FUNDS:
      return state;
    case GET_AVAILABLE_FUNDS_SUCCESS:
      return state.set('availableFunds', action.availableFunds);
    case GET_AVAILABLE_FUNDS_ERROR:
      return state.set('error', action.error);
    case GET_ACCOUNT_BILLS:
      return state;
    case GET_ACCOUNT_BILLS_SUCCESS:
      return state.set('accountBills', action.accountBills);
    case GET_ACCOUNT_BILLS_ERROR:
      return state.set('error', action.error);
    case GET_ACCOUNT_BALANCE_HISTORY:
      return state;
    case GET_ACCOUNT_BALANCE_HISTORY_SUCCESS:
      return state.set('accountBalanceHistory', action.accountBalanceHistory);
    case GET_ACCOUNT_BALANCE_HISTORY_ERROR:
      return state.set('error', action.error);
    case GET_RECENT_TRANSACTIONS_SENDER:
      return state;
    case GET_RECENT_TRANSACTIONS_SENDER_SUCCESS:
      return state.set(
        'recentTransactionsSender',
        action.recentTransactionsSender,
      );
    case GET_RECENT_TRANSACTIONS_SENDER_ERROR:
      return state.set('error', action.error);
    case GET_RECENT_TRANSACTIONS_RECIPIENT:
      return state;
    case GET_RECENT_TRANSACTIONS_RECIPIENT_SUCCESS:
      return state.set(
        'recentTransactionsRecipient',
        action.recentTransactionsRecipient,
      );
    case GET_RECENT_TRANSACTIONS_RECIPIENT_ERROR:
      return state.set('error', action.error);
    case GET_OUTGOING_TRANSFERS_SUM:
      return state;
    case GET_OUTGOING_TRANSFERS_SUM_SUCCESS:
      return state.set('outgoingTransfersSum', action.outgoingTransfersSum);
    case GET_OUTGOING_TRANSFERS_SUM_ERROR:
      return state.set('error', action.error);
    case GET_INCOMING_TRANSFERS_SUM:
      return state;
    case GET_INCOMING_TRANSFERS_SUM_SUCCESS:
      return state.set('incomingTransfersSum', action.incomingTransfersSum);
    case GET_INCOMING_TRANSFERS_SUM_ERROR:
      return state.set('error', action.error);

    case MAKE_PAYMENT_SUCCESS:
      return state
        .set('availableFunds', null)
        .set('accountBills', null)
        .set('accountBalanceHistory', null)
        .set('recentTransactionsSender', null)
        .set('recentTransactionsRecipient', null)
        .set('outgoingTransfersSum', null)
        .set('incomingTransfersSum', null);

    default:
      return state;
  }
}

export default dashboardPageReducer;
