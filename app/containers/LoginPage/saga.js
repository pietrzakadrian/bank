import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';
import { makeLoginSelector, makePasswordSelector } from './selectors';
import { ENTER_LOGIN, ENTER_PASSWORD } from './constants';

import {
  enterLoginSuccessAction,
  enterLoginErrorAction,
  enterPasswordSuccessAction,
  enterPasswordErrorAction,
  stepNextAction,
  loginAction,
  loginSuccessAction,
  loginErrorAction,
} from './actions';
import env from '../../env';

export function* handleLogin() {
  const login = yield select(makeLoginSelector());
  const requestURL = `${env.API_URL}/api/users/isLogin/${login}`;
  const isNumber = /^\d+$/;

  if (!login) return yield put(enterLoginErrorAction('empty'));
  if (!isNumber.test(login)) return yield put(enterLoginErrorAction('error'));

  try {
    const response = yield call(request, requestURL);

    if (!response.isLogin) return yield put(enterLoginErrorAction('not exist'));

    yield put(enterLoginSuccessAction());
    yield put(stepNextAction());
  } catch (err) {
    yield put(enterLoginErrorAction(err));
  }
}

export function* handlePassword() {
  const password = yield select(makePasswordSelector());

  if (!password) return yield put(enterPasswordErrorAction('empty'));
  yield call(loginAttempt);
}

function* loginAttempt() {
  const login = yield select(makeLoginSelector());
  const password = yield select(makePasswordSelector());
  const requestURL = `${env.API_URL}/api/users/login`;

  if (!login || !password) return yield put(loginErrorAction('empty'));

  try {
    yield put(loginAction(login, password));
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });

    if (!response.success) return yield put(loginErrorAction('error'));
    yield put(enterPasswordSuccessAction());
    yield put(loginSuccessAction());

    localStorage.setItem('token', response.token);
    yield put(push('/dashboard'));
  } catch (err) {
    yield put(loginErrorAction(err));
  }
}

export default function* loginPageSaga() {
  yield takeLatest(ENTER_LOGIN, handleLogin);
  yield takeLatest(ENTER_PASSWORD, handlePassword);
}
