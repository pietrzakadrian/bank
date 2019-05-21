import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import request from 'utils/request';
import decode from 'jwt-decode';
import moment from 'moment';
import { makeNotificationCountSelector } from 'containers/App/selectors';
import env from '../../../../server/config/env.config';
import {
  IS_NOTIFICATION,
  LOGOUT,
  UNSET_NOTIFICATION,
  NEW_NOTIFICATION,
} from './constants';
import {
  newNotificationAction,
  successLogoutAction,
  errorLogoutAction,
  loadNewNotificationAction,
} from './actions';

function* getToken() {
  // Retrieves the user token from localStorage
  return localStorage.getItem('id_token');
}

function* getUserId() {
  return decode(yield call(getToken));
}

export function* isNotification() {
  const token = yield call(getUserId);
  const requestURL = `${env.api_url}/additionals/isNotification/${token.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${yield call(getToken)}`,
      },
    });

    response.isNotification
      ? yield put(newNotificationAction(response.notificationCount))
      : null;
  } catch (err) {
    /* just ignore */
  }
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

export function* newNotification() {
  const token = yield call(getUserId);
  const userId = token.id;
  const notificationCount = yield select(makeNotificationCountSelector());
  const requestURL = `${env.api_url}/additionals/newNotification`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${yield call(getToken)}`,
        'CSRF-Token': readCookie('XSRF-TOKEN'),
      },
      body: JSON.stringify({
        userId,
        notificationCount,
      }),
    });

    if (response.success) {
      const output = response.result.map(({ getSenderdata, ...rest }) => ({
        date_time: moment(rest.date_time).format('HH:mm'),
        amount_money: `${rest.amount_money
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
          .replace('.', ',')} ${rest.currency.currency}`,
        sender_name: `${getSenderdata.name} ${getSenderdata.surname}`,
      }));

      yield put(loadNewNotificationAction(output));
    }
  } catch (err) {
    /* just ignore */
  }
}

export function* unsetNotification() {
  const token = yield call(getUserId);
  const requestURL = `${env.api_url}/additionals/unsetNotification/${token.id}`;

  try {
    yield call(request, requestURL, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${yield call(getToken)}`,
        'CSRF-Token': readCookie('XSRF-TOKEN'),
      },
    });
  } catch (err) {
    /* just ignore */
  }
}

export function* logout() {
  const token = yield call(getUserId);
  const jwt = yield call(getToken);
  const requestURL = `${env.api_url}/users/logout/${token.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
        'CSRF-Token': readCookie('XSRF-TOKEN'),
      },
    });

    response.success
      ? (yield put(successLogoutAction()), yield put(push('/login')))
      : yield put(errorLogoutAction());
  } catch (err) {
    yield put(errorLogoutAction());
  }
}

// Individual exports for testing
export default function* headerSaga() {
  yield takeLatest(IS_NOTIFICATION, isNotification);
  yield takeLatest(NEW_NOTIFICATION, newNotification);
  yield takeLatest(UNSET_NOTIFICATION, unsetNotification);
  yield takeLatest(LOGOUT, logout);
}
