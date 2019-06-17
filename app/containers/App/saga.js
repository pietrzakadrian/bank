import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  makeIsLoggedSelector,
  makeUserIdSelector,
  makeTokenSelector,
} from 'containers/App/selectors';
import request from 'utils/request';
import decode from 'jwt-decode';
import api from '../../api';
import { LOGOUT, IS_LOGGED } from './constants';
import { logoutErrorAction, logoutSuccessAction } from './actions';

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

  if (token && decode(token).exp < new Date().getTime() / 1000)
    yield put(logoutSuccessAction());

  if (!isLogged || !userId || !token) return yield put(push('/'));
}

export default function* appPageSaga() {
  yield takeLatest(LOGOUT, handleLogout);
  yield takeLatest(IS_LOGGED, handleLogged);
}
