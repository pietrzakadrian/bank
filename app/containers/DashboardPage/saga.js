import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  makeIsLoggedSelector,
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
} from './actions';

export function* handleUserdata() {
  const isLogged = yield select(makeIsLoggedSelector());
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const requestURL = `${api.baseURL}${api.users.userPath}${userId}`;

  if (!isLogged || !userId || !token)
    return yield put(logoutErrorAction('error'));

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
}
