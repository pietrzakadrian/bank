import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  makeIsLoggedSelector,
  makeUserIdSelector,
  makeTokenSelector,
  makeNotificationCountSelector,
  makeIsOpenNotificationsSelector,
  makeNotificationsSelector,
} from 'containers/App/selectors';
import { format } from 'date-fns';
import request from 'utils/request';
import decode from 'jwt-decode';
import api from 'api';
import {
  LOGOUT,
  IS_LOGGED,
  CHECK_NEW_NOTIFICATIONS,
  TOGGLE_NOTIFICATIONS,
} from './constants';
import {
  logoutErrorAction,
  logoutSuccessAction,
  checkNewNotificationsSuccessAction,
  checkNewNotificationsErrorAction,
  getNewNotificationsAction,
  getNewNotificationsSuccessAction,
  getNewNotificationsErrorAction,
  unsetNewNotificationsErrorAction,
  unsetNewNotificationsAction,
  unsetNewNotificationsSuccessAction,
} from './actions';

export function* handleLogout() {
  const isLogged = yield select(makeIsLoggedSelector());
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const requestURL = `${api.baseURL}${api.users.logoutPath}${userId}`;

  if (!isLogged || !userId || !token) return yield put(push('/'));

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.success) {
      yield put(logoutSuccessAction());
      return yield put(push('/'));
    }
  } catch (error) {
    yield put(logoutErrorAction(error));
    yield put(push('/'));
  }
}

export function* handleLogged() {
  const isLogged = yield select(makeIsLoggedSelector());
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());

  if (
    !isLogged ||
    !userId ||
    !token ||
    decode(token).exp < new Date().getTime() / 1000
  ) {
    yield put(logoutSuccessAction());
    return yield put(push('/'));
  }
}

export function* handleNotifications() {
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const requestURL = `${api.baseURL}${
    api.additionals.isNotificationPath
  }${userId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const { isNotification, notificationCount } = response;

    if (isNotification) {
      yield put(checkNewNotificationsSuccessAction(notificationCount));
      yield call(getNewNotifications);
    }
  } catch (error) {
    yield put(checkNewNotificationsErrorAction(error));
  }
}

export function* getNewNotifications() {
  const userId = yield select(makeUserIdSelector());
  const locale = yield select(makeSelectLocale());
  const token = yield select(makeTokenSelector());
  const notificationCount = yield select(makeNotificationCountSelector());
  const requestURL = `${api.baseURL}${api.additionals.newNotificationPath}`;

  try {
    yield put(getNewNotificationsAction());

    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        notificationCount,
      }),
    });

    const { success, result } = response;

    if (!success) return yield put(getNewNotificationsErrorAction('error'));

    const transformNewNotifications = result.map(
      ({ getSenderdata, currency, ...newNotification }) => ({
        date_time: format(
          newNotification.date_time,
          `DD.MM.YYYY, ${locale === 'en' ? 'hh:MM A' : 'HH:MM'}`,
        ),
        sender_name: `${getSenderdata.name} ${getSenderdata.surname}`,
        amount_money: `${newNotification.amount_money
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
          .replace('.', ',')} ${currency.currency}`,
      }),
    );

    yield put(getNewNotificationsSuccessAction(transformNewNotifications));
  } catch (error) {
    yield put(getNewNotificationsErrorAction(error));
  }
}

export function* handleNewNotifications() {
  const isOpenNotifications = yield select(makeIsOpenNotificationsSelector());
  const notifications = yield select(makeNotificationsSelector());
  const token = yield select(makeTokenSelector());
  const userId = yield select(makeUserIdSelector());
  const requestURL = `${api.baseURL}${
    api.additionals.unsetNotificationPath
  }${userId}`;

  if (isOpenNotifications && notifications.length) {
    try {
      yield put(unsetNewNotificationsAction());
      const response = yield call(request, requestURL, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const { success } = response;

      if (!success) return yield put(unsetNewNotificationsErrorAction('error'));

      yield put(unsetNewNotificationsSuccessAction());
    } catch (error) {
      yield put(unsetNewNotificationsErrorAction(error));
    }
  }
}

export default function* appPageSaga() {
  yield takeLatest(LOGOUT, handleLogout);
  yield takeLatest(IS_LOGGED, handleLogged);
  yield takeLatest(CHECK_NEW_NOTIFICATIONS, handleNotifications);
  yield takeLatest(TOGGLE_NOTIFICATIONS, handleNewNotifications);
}
