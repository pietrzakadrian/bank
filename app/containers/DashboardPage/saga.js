import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';
import {
  BORDER_GREY_LIGHT,
  PRIMARY_BLUE_LIGHT,
  PRIMARY_RED,
} from 'utils/colors';
import {
  makeUserIdSelector,
  makeTokenSelector,
} from 'containers/App/selectors';
import { logoutErrorAction } from 'containers/App/actions';
import {
  GET_NAME,
  GET_SURNAME,
  GET_LAST_PRESENT_LOGGED,
  GET_LAST_SUCCESSFUL_LOGGED,
  GET_LAST_FAILED_LOGGED,
  GET_EMAIL,
  GET_AVAILABLE_FUNDS,
  GET_ACCOUNT_BALANCE_HISTORY,
  GET_CURRENCY,
  GET_RECHARTS_DATA,
  GET_RECHARTS_COLORS,
  GET_RECHARTS_PROCENT,
  GET_ACCOUNT_BILLS,
} from './constants';
import api from '../../api';
import {
  getNameErrorAction,
  getSurnameAction,
  getEmailErrorAction,
  getLastSuccessfulLoggedErrorAction,
  getLastPresentLoggedErrorAction,
  getLastFailedLoggedErrorAction,
  getNameSuccessAction,
  getSurnameSuccessAction,
  getEmailSuccessAction,
  getLastSuccessfulLoggedSuccessAction,
  getLastPresentLoggedSuccessAction,
  getLastFailedLoggedSuccessAction,
  getAvailableFundsSuccessAction,
  getAvailableFundsErrorAction,
  getAccountBalanceHistorySuccessAction,
  getAccountBalanceHistoryErrorAction,
  getCurrencySuccessAction,
  getCurrencyErrorAction,
  getRecentTransactionsSenderErrorAction,
  getRecentTransactionsRecipientAction,
  getRecentTransactionsSenderAction,
  getRecentTransactionsSenderSuccessAction,
  getRecentTransactionsRecipientSuccessAction,
  getRecentTransactionsRecipientErrorAction,
  getRechartsColorsAction,
  getRechartsColorsSuccessAction,
  getRechartsDataAction,
  getRechartsDataSuccessAction,
  getRechartsProcentAction,
  getRechartsProcentSuccessAction,
  getIncomingTransfersSumSuccessAction,
  getIncomingTransfersSumErrorAction,
  getOutgoingTransfersSumSuccessAction,
  getOutgoingTransfersSumErrorAction,
  getAccountBillsSuccessAction,
  getAccountBillsErrorAction,
} from './actions';
import {
  makeCurrencySelector,
  makeRecentTransactionsSenderSelector,
  makeRecentTransactionsRecipientSelector,
  makeOutgoingTransfersSumSelector,
  makeIncomingTransfersSumSelector,
} from './selectors';

export function* handleUserdata() {
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const requestURL = `${api.baseURL}${api.users.userPath}${userId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.user.name) yield put(getNameErrorAction('error'));
    else yield put(getNameSuccessAction(response.user.name));

    if (!response.user.surname) yield put(getSurnameAction('error'));
    else yield put(getSurnameSuccessAction(response.user.surname));

    if (!response.user.email) yield put(getEmailErrorAction('error'));
    else yield put(getEmailSuccessAction(response.user.email));

    if (!response.user.last_present_logged)
      yield put(getLastPresentLoggedErrorAction('error'));
    else
      yield put(
        getLastPresentLoggedSuccessAction(response.user.last_present_logged),
      );

    if (!response.user.last_successful_logged)
      yield put(getLastSuccessfulLoggedErrorAction('error'));
    else
      yield put(
        getLastSuccessfulLoggedSuccessAction(
          response.user.last_successful_logged,
        ),
      );

    if (!response.user.last_failed_logged)
      yield put(getLastFailedLoggedErrorAction('error'));
    else
      yield put(
        getLastFailedLoggedSuccessAction(response.user.last_failed_logged),
      );
  } catch (error) {
    yield put(logoutErrorAction(error));
    yield put(push('/'));
  }
}

export function* handleAccountingData() {
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const requestURL = `${api.baseURL}${api.bills.billsPath}${userId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response[0].available_funds === 0 || response[0].available_funds)
      yield put(
        getAvailableFundsSuccessAction(
          response[0].available_funds
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
            .replace('.', ','),
        ),
      );
    else yield put(getAvailableFundsErrorAction('error'));

    if (response[0].account_bill)
      yield put(
        getAccountBillsSuccessAction(
          response[0].account_bill
            .toString()
            .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
            .trim(),
        ),
      );
    else yield put(getAccountBillsErrorAction('error'));

    if (response[0].additionals[0].account_balance_history)
      yield put(
        getAccountBalanceHistorySuccessAction(
          JSON.parse(`[${response[0].additionals[0].account_balance_history}]`),
        ),
      );
    else getAccountBalanceHistoryErrorAction('error');

    if (response[0].currency.currency)
      yield put(getCurrencySuccessAction(response[0].currency.currency));
    else yield put(getCurrencyErrorAction('error'));

    if (response[0].additionals[0].incoming_transfers_sum || response)
      yield put(
        getIncomingTransfersSumSuccessAction(
          response[0].additionals[0].incoming_transfers_sum,
        ),
      );
    else yield put(getIncomingTransfersSumErrorAction('error'));

    if (response[0].additionals[0].outgoing_transfers_sum || response)
      yield put(
        getOutgoingTransfersSumSuccessAction(
          response[0].additionals[0].outgoing_transfers_sum,
        ),
      );
    else yield put(getOutgoingTransfersSumErrorAction('error'));
  } catch (error) {
    yield put(getAvailableFundsErrorAction(error));
    yield put(getAccountBalanceHistoryErrorAction(error));
    yield put(getCurrencyErrorAction(error));
  }
}

export function* handleRecharts() {
  yield call(getRecentTransactionsSender);
  yield call(getRecentTransactionsRecipient);

  const recentTransactionsSender = yield select(
    makeRecentTransactionsSenderSelector(),
  );
  const recentTransactionsRecipient = yield select(
    makeRecentTransactionsRecipientSelector(),
  );
  const outgoingTransfersSum = yield select(makeOutgoingTransfersSumSelector());
  const incomingTransfersSum = yield select(makeIncomingTransfersSumSelector());

  if (recentTransactionsSender || recentTransactionsRecipient) {
    if (recentTransactionsSender === 0 && recentTransactionsRecipient === 0) {
      yield put(getRechartsColorsAction());
      yield put(
        getRechartsColorsSuccessAction(JSON.parse(`["${BORDER_GREY_LIGHT}"]`)),
      );

      // todo: ?
      // yield put(getRechartsDataAction());
      yield put(getRechartsDataSuccessAction([{ name: 'Group A', value: 1 }]));

      yield put(getRechartsProcentAction());
      yield put(getRechartsProcentSuccessAction(0));
    } else {
      yield put(getRechartsColorsAction());
      yield put(
        getRechartsColorsSuccessAction(
          JSON.parse(`["${PRIMARY_BLUE_LIGHT}", "${PRIMARY_RED}"]`),
        ),
      );

      // todo: ?
      // yield put(getRechartsDataAction());
      yield put(
        getRechartsDataSuccessAction([
          {
            name: 'Group A',
            value: incomingTransfersSum,
          },
          {
            name: 'Group B',
            value: outgoingTransfersSum,
          },
        ]),
      );

      yield put(getRechartsProcentAction());

      const rechartsProcent =
        (incomingTransfersSum * 100) /
          (parseFloat(incomingTransfersSum) +
            parseFloat(outgoingTransfersSum)) || 0;

      yield put(
        getRechartsProcentSuccessAction(
          rechartsProcent.toFixed(1).replace('.', ','),
        ),
      );
    }
  }
}

function* getRecentTransactionsSender() {
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const requestURL = `${api.baseURL}${api.transactions.senderPath}${userId}`;

  try {
    yield put(getRecentTransactionsSenderAction());

    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) yield put(getRecentTransactionsSenderSuccessAction(response));
    else yield put(getRecentTransactionsSenderErrorAction('error'));
  } catch (error) {
    yield put(getRecentTransactionsSenderErrorAction(error));
  }
}

function* getRecentTransactionsRecipient() {
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const requestURL = `${api.baseURL}${api.transactions.recipientPath}${userId}`;

  try {
    yield put(getRecentTransactionsRecipientAction());

    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response)
      yield put(getRecentTransactionsRecipientSuccessAction(response));
    else yield put(getRecentTransactionsRecipientErrorAction('error'));
  } catch (error) {
    yield put(getRecentTransactionsSenderErrorAction(error));
  }
}

export default function* dashboardPageSaga() {
  yield takeLatest(
    GET_NAME ||
      GET_SURNAME ||
      GET_EMAIL ||
      GET_LAST_FAILED_LOGGED ||
      GET_LAST_PRESENT_LOGGED ||
      GET_LAST_SUCCESSFUL_LOGGED,
    handleUserdata,
  );
  yield takeLatest(
    GET_AVAILABLE_FUNDS ||
      GET_ACCOUNT_BILLS ||
      GET_ACCOUNT_BALANCE_HISTORY ||
      GET_CURRENCY,
    handleAccountingData,
  );
  yield takeLatest(
    GET_RECHARTS_DATA || GET_RECHARTS_COLORS || GET_RECHARTS_PROCENT,
    handleRecharts,
  );
}
