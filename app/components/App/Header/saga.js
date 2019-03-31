import { call, put, takeLatest } from 'redux-saga/effects';

import { push } from 'connected-react-router/immutable';
import request from 'utils/request';
import decode from 'jwt-decode';
import { IS_NOTIFICATION, LOGOUT, UNSET_NOTIFICATION } from './constants';
import {
  newNotificationAction,
  successLogoutAction,
  errorLogoutAction,
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
  const requestURL = `/api/additionals/isNotification/${token.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${yield call(getToken)}`,
      },
    });

    response.isNotification ? yield put(newNotificationAction()) : null;
  } catch (err) {
    /* just ignore */
  }
}

export function* unsetNotification() {
  const token = yield call(getUserId);
  const requestURL = `/api/additionals/unsetNotification/${token.id}`;

  try {
    yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${yield call(getToken)}`,
      },
    });
  } catch (err) {
    /* just ignore */
  }
}

export function* logout() {
  const token = yield call(getUserId);
  const jwt = yield call(getToken);
  const requestURL = `/api/users/logout/${token.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
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
  yield takeLatest(UNSET_NOTIFICATION, unsetNotification);
  yield takeLatest(LOGOUT, logout);
}
