import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';
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
} from './actions';
import { makeCurrencySelector } from './selectors';

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
  const currency = yield select(makeCurrencySelector());

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

    if (response[0].additionals[0].account_balance_history)
      yield put(
        getAccountBalanceHistorySuccessAction(
          JSON.parse(`[${response[0].additionals[0].account_balance_history}]`),
        ),
      );
    else getAccountBalanceHistoryErrorAction('error');

    if (!currency && response[0].currency.currency)
      yield put(getCurrencySuccessAction(response[0].currency.currency));
    else yield put(getCurrencyErrorAction('error'));
  } catch (error) {
    yield put(getAvailableFundsErrorAction(error));
    yield put(getAccountBalanceHistoryErrorAction(error));
    if (!currency) yield put(getCurrencyErrorAction(error));
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
    GET_AVAILABLE_FUNDS || GET_ACCOUNT_BALANCE_HISTORY || GET_CURRENCY,
    handleAccountingData,
  );
}
