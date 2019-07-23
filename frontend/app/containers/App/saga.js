import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { format } from 'date-fns';
import request from 'utils/request';
import ApiEndpoint from 'utils/api';
import AuthService from 'services/auth.service';

// Import Selectors
import {
  makeNotificationCountSelector,
  makeIsOpenNotificationsSelector,
  makeNotificationsSelector,
} from 'containers/App/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

// Import Actions
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

// Import Constants
import {
  LOGOUT,
  IS_LOGGED,
  CHECK_NEW_NOTIFICATIONS,
  TOGGLE_NOTIFICATIONS,
} from './constants';

export function* handleLogout() {
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const requestURL = api.getLogoutPath();

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
      auth.unsetToken();
      return yield put(push('/'));
    }
  } catch (error) {
    yield put(logoutErrorAction(error));
    auth.unsetToken();
    yield put(push('/'));
  }
}

export function* handleLogged() {
  const auth = new AuthService();
  const isLogged = auth.loggedIn();

  if (!isLogged) {
    yield put(logoutSuccessAction());
    auth.unsetToken();
    return yield put(push('/'));
  }
}

export function* handleNotifications() {
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const requestURL = api.getIsNotificationPath();

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

      console.log('isNotification', isNotification);
      yield call(getNewNotifications);
    }
  } catch (error) {
    yield put(checkNewNotificationsErrorAction(error));
  }
}

export function* getNewNotifications() {
  const locale = yield select(makeSelectLocale());
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const notificationCount = yield select(makeNotificationCountSelector());
  const requestURL = api.getNotificationsPath(notificationCount);

  try {
    yield put(getNewNotificationsAction());

    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const { success, notifications } = response;

    if (!success) return yield put(getNewNotificationsErrorAction('error'));

    const transformNewNotifications = notifications.map(
      ({ ...newNotification }) => ({
        date_time: format(
          newNotification.transaction_createdDate,
          `DD.MM.YYYY, ${locale === 'en' ? 'hh:MM A' : 'HH:MM'}`,
        ),
        sender_name: `${newNotification.user_name} ${newNotification.user_surname}`,
        amount_money: `${newNotification.transaction_amountMoney
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
          .replace('.', ',')} ${newNotification.currency_name}`,
      }),
    );

    console.log('transformNewNotifications', transformNewNotifications);

    yield put(getNewNotificationsSuccessAction(transformNewNotifications));
  } catch (error) {
    yield put(getNewNotificationsErrorAction(error));
  }
}

export function* handleNewNotifications() {
  const isOpenNotifications = yield select(makeIsOpenNotificationsSelector());
  const notifications = yield select(makeNotificationsSelector());
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const requestURL = api.getNotificationsPath();

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
  // yield takeLatest(TOGGLE_NOTIFICATIONS, handleNewNotifications);
}
