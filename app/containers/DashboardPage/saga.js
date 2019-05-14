/* eslint-disable no-sequences */
/* eslint-disable indent */
import decode from 'jwt-decode';
import { push } from 'connected-react-router/immutable';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { successLogoutAction } from 'components/App/Header/actions';
import env from '../../../server/config/env.config';
import {
  GET_AVAILABLE_FUNDS,
  GET_ACCOUNT_BALANCE_HISTORY,
  GET_ACCOUNT_BILLS,
  GET_CURRENCY,
  GET_INCOMING_TRANSFERS_SUM,
  GET_OUTGOING_TRANSFERS_SUM,
  GET_RECENT_TRANSACTIONS_RECIPIENT,
  GET_RECENT_TRANSACTIONS_SENDER,
  GET_NAME,
  GET_SURNAME,
  GET_LAST_PRESENT_LOGGED,
  GET_LAST_SUCCESSFUL_LOGGED,
} from './constants';
import {
  getAvailableFundsSuccessAction,
  getAccountBalanceHistorySuccessAction,
  getAccountBalanceHistoryErrorAction,
  getAvailableFundsErrorAction,
  getAccountBillsSuccessAction,
  getAccountBillsErrorAction,
  getIncomingTransfersSumSuccessAction,
  getIncomingTransfersSumErrorAction,
  getOutgoingTransfersSumSuccessAction,
  getOutgoingTransfersSumErrorAction,
  getRecentTransactionsSenderErrorAction,
  getRecentTransactionsRecipientSuccessAction,
  getRecentTransactionsSenderSuccessAction,
  getNameSuccessAction,
  getNameErrorAction,
  getSurnameSuccessAction,
  getSurnameErrorAction,
  getCurrencySuccessAction,
  getCurrencyErrorAction,
  getLastSuccessfulLoggedSuccessAction,
  getLastSuccessfulLoggedErrorAction,
  getLastPresentLoggedSuccessAction,
  getLastPresentLoggedErrorAction,
  getEmailSuccessAction,
} from './actions';
import { makeCurrencySelector } from './selectors';

function* getToken() {
  // Retrieves the user token from localStorage
  return localStorage.getItem('id_token');
}

function* getUserId() {
  return decode(yield call(getToken));
}

export function* getUserData() {
  const token = yield call(getUserId);
  const jwt = yield call(getToken);
  const requestURL = `${env.api_url}/bills/${token.id}`;
  const currency = yield select(makeCurrencySelector());

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });

    response[0].available_funds === 0 || response[0].available_funds
      ? yield put(getAvailableFundsSuccessAction(response[0].available_funds))
      : yield put(getAvailableFundsErrorAction('error'));

    response[0].additionals[0].account_balance_history
      ? yield put(
          getAccountBalanceHistorySuccessAction(
            response[0].additionals[0].account_balance_history,
          ),
        )
      : yield put(getAccountBalanceHistoryErrorAction('error'));

    if (!currency) {
      response[0].currency.currency
        ? yield put(getCurrencySuccessAction(response[0].currency.currency))
        : yield put(getCurrencyErrorAction('error'));
    }
  } catch (err) {
    yield put(successLogoutAction()), yield put(push('/login'));
  }
}

export function* getAccountBills() {
  const token = yield call(getUserId);
  const jwt = yield call(getToken);
  const requestURL = `${env.api_url}/bills/${token.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });

    response[0].account_bill
      ? yield put(getAccountBillsSuccessAction(response[0].account_bill))
      : yield put(getAccountBillsErrorAction('error'));
  } catch (err) {
    yield put(successLogoutAction());
  }
}

export function* getTransfersSum() {
  const token = yield call(getUserId);
  const jwt = yield call(getToken);
  const requestURL = `${env.api_url}/bills/${token.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });

    response[0].additionals[0].incoming_transfers_sum || response
      ? yield put(
          getIncomingTransfersSumSuccessAction(
            response[0].additionals[0].incoming_transfers_sum,
          ),
        )
      : yield put(getIncomingTransfersSumErrorAction('error'));

    response[0].additionals[0].outgoing_transfers_sum || response
      ? yield put(
          getOutgoingTransfersSumSuccessAction(
            response[0].additionals[0].outgoing_transfers_sum,
          ),
        )
      : yield put(getOutgoingTransfersSumErrorAction('error'));
  } catch (err) {
    yield put(successLogoutAction());
    yield put(push('/login'));
  }
}

function* getRecentTransactionsSender() {
  const token = yield call(getUserId);
  const jwt = yield call(getToken);
  const requestURL = `${env.api_url}/transactions/sender/${token.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });

    response
      ? yield put(getRecentTransactionsSenderSuccessAction(response))
      : yield put(getRecentTransactionsSenderErrorAction('error'));
  } catch (err) {
    yield put(successLogoutAction());
    yield put(push('/login'));
  }
}

function* getRecentTransactionsRecipient() {
  const token = yield call(getUserId);
  const jwt = yield call(getToken);
  const requestURL = `${env.api_url}/transactions/recipient/${token.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });

    response
      ? yield put(getRecentTransactionsRecipientSuccessAction(response))
      : yield put(getRecentTransactionsRecipientSuccessAction('error'));
  } catch (err) {
    yield put(successLogoutAction());
    yield put(push('/login'));
  }
}

export function* getRecentTransactionsData() {
  yield call(getRecentTransactionsSender);
  yield call(getRecentTransactionsRecipient);
}

export function* getUserInformation() {
  const token = yield call(getUserId);
  const jwt = yield call(getToken);
  const requestURL = `${env.api_url}/users/${token.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });

    response.user.name
      ? yield put(getNameSuccessAction(response.user.name))
      : yield put(getNameErrorAction('error'));

    response.user.surname
      ? yield put(getSurnameSuccessAction(response.user.surname))
      : yield put(getSurnameErrorAction('error'));

    response.user.email
      ? yield put(getEmailSuccessAction(response.user.email))
      : yield put(getSurnameErrorAction('error'));

    response.user.last_successful_logged
      ? yield put(
          getLastSuccessfulLoggedSuccessAction(
            response.user.last_successful_logged,
          ),
        )
      : yield put(getLastSuccessfulLoggedErrorAction('error'));

    response.user.last_present_logged
      ? yield put(
          getLastPresentLoggedSuccessAction(response.user.last_present_logged),
        )
      : yield put(getLastPresentLoggedErrorAction('error'));
  } catch (err) {
    yield put(successLogoutAction()), yield put(push('/login'));
  }
}

// Individual exports for testing
export default function* dashboardPageSaga() {
  yield takeLatest(
    GET_AVAILABLE_FUNDS || GET_ACCOUNT_BALANCE_HISTORY || GET_CURRENCY,
    getUserData,
  );

  yield takeLatest(
    GET_OUTGOING_TRANSFERS_SUM || GET_INCOMING_TRANSFERS_SUM,
    getTransfersSum,
  );

  yield takeLatest(
    GET_RECENT_TRANSACTIONS_RECIPIENT || GET_RECENT_TRANSACTIONS_SENDER,
    getRecentTransactionsData,
  );

  yield takeLatest(GET_ACCOUNT_BILLS, getAccountBills);

  yield takeLatest(
    GET_NAME ||
      GET_SURNAME ||
      GET_LAST_PRESENT_LOGGED ||
      GET_LAST_SUCCESSFUL_LOGGED,
    getUserInformation,
  );
}
