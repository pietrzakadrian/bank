import decode from 'jwt-decode';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import moment from 'moment';
import { GET_GRID_DATA, GRID_STATE_CHANGE } from './constants';
import {
  getGridDataSuccessAction,
  getGridDataTransformSuccessAction,
  getGridDataErrorAction,
  changePageAction,
} from './actions';
import { makeCurrentPageSelector, makePageSizeSelector } from './selectors';
('../../../server/config/env.config');

function* getToken() {
  // Retrieves the user token from localStorage
  return localStorage.getItem('id_token');
}

function* getUserId() {
  return decode(yield call(getToken));
}

function readCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function* getGridData() {
  const token = yield call(getUserId);
  const jwt = yield call(getToken);
  const requestURL = `https://bank.pietrzakadrian.com/api/transactions/getTransactions`;
  const userId = token.id;
  const pageSize = yield select(makePageSizeSelector());
  const currentPage = yield select(makeCurrentPageSelector());
  const offset = pageSize * currentPage;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
        'CSRF-Token': readCookie('XSRF-TOKEN'),
      },
      body: JSON.stringify({
        userId,
        offset,
      }),
    });

    if (!response.error) {
      const totalCount = response.count;

      yield put(getGridDataSuccessAction(totalCount));
      const output = response.rows.map(
        ({ getSenderdata, getRecipientdata, ...rest }) => ({
          ...rest,
          date_time: moment(rest.date_time).format('DD.MM.YYYY, HH:mm'),
          amount_money:
            rest.id_sender === userId
              ? `-${rest.amount_money.toFixed(2)} ${rest.currency.currency}`
              : `${rest.amount_money.toFixed(2)} ${rest.currency.currency}`,
          sender_name: `${getSenderdata.name} ${getSenderdata.surname}`,
          recipient_name: `${getRecipientdata.name} ${
            getRecipientdata.surname
          }`,
          account_bill:
            rest.id_sender === userId
              ? getRecipientdata.bills[0].account_bill
              : getSenderdata.bills[0].account_bill,
        }),
      );

      const finalOutput = { rows: [...output] };

      yield put(getGridDataTransformSuccessAction(finalOutput.rows));
    } else {
      yield put(getGridDataErrorAction('error'));
    }
  } catch (err) {
    /* */
  }
}

export function* changePage() {
  const token = yield call(getUserId);
  const jwt = yield call(getToken);
  const requestURL = `https://bank.pietrzakadrian.com/api/transactions/getTransactions`;
  const userId = token.id;
  const pageSize = yield select(makePageSizeSelector());
  const currentPage = yield select(makeCurrentPageSelector());
  const offset = pageSize * currentPage;

  try {
    yield put(changePageAction());
    const response = yield call(request, requestURL, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
        'CSRF-Token': readCookie('XSRF-TOKEN'),
      },
      body: JSON.stringify({
        userId,
        offset,
      }),
    });

    if (!response.error) {
      const output = response.rows.map(
        ({ getSenderdata, getRecipientdata, ...rest }) => ({
          ...rest,
          date_time: moment(rest.date_time).format('DD.MM.YYYY, HH:mm'),
          amount_money:
            rest.id_sender === userId
              ? `-${rest.amount_money.toFixed(2)} ${rest.currency.currency}`
              : `${rest.amount_money.toFixed(2)} ${rest.currency.currency}`,
          sender_name: `${getSenderdata.name} ${getSenderdata.surname}`,
          recipient_name: `${getRecipientdata.name} ${
            getRecipientdata.surname
          }`,
          account_bill:
            rest.id_sender === userId
              ? getRecipientdata.bills[0].account_bill
              : getSenderdata.bills[0].account_bill,
        }),
      );

      const finalOutput = { rows: [...output] };
      yield put(getGridDataTransformSuccessAction(finalOutput.rows));
    }
  } catch (e) {
    /* just ignore */
  }
}

// Individual exports for testing
export default function* historyPageSaga() {
  yield takeLatest(GET_GRID_DATA, getGridData);
  yield takeLatest(GRID_STATE_CHANGE, changePage);
}
