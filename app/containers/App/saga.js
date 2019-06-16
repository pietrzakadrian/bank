import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  makeIsLoggedSelector,
  makeUserIdSelector,
  makeTokenSelector,
} from 'containers/App/selectors';
import request from 'utils/request';
import api from '../../api';
import { LOGOUT } from './constants';
import { logoutErrorAction, logoutSuccessAction } from './actions';

export function* handleLogout() {
  const isLogged = yield select(makeIsLoggedSelector());
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const requestURL = `${api.baseURL}${api.users.logoutPath}${userId}`;

  if (!isLogged || !userId || !token)
    return yield put(logoutErrorAction('err'));

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.success) return yield put(logoutErrorAction('err'));

    yield put(logoutSuccessAction());
    yield put(push('/'));
  } catch (error) {
    return yield put(logoutErrorAction(error));
  }
}

export default function* appPageSaga() {
  yield takeLatest(LOGOUT, handleLogout);
}
