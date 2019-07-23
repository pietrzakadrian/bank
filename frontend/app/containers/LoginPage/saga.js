import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { FormattedMessage } from 'react-intl';
import request from 'utils/request';
import { push } from 'connected-react-router';
import ApiEndpoint from 'utils/api';
import messages from 'containers/LoginPage/messages';

// Import Services
import AuthService from 'services/auth.service';

// Import Selectors
import {
  makeLoginSelector,
  makePasswordSelector,
} from 'containers/LoginPage/selectors';

// Import Actions
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
import { loggedInAction } from 'containers/App/actions';

// Import Constants
import { ENTER_LOGIN, ENTER_PASSWORD, IS_LOGGED } from './constants';

export function* handleLogged() {
  const auth = new AuthService();
  const isLogged = auth.loggedIn();

  if (isLogged) return yield put(push('/dashboard'));
}

export function* handleLogin() {
  const api = new ApiEndpoint();
  const login = yield select(makeLoginSelector());
  const requestURL = api.getIsLoginPath(login);
  const isNumber = /^\d+$/;
  const limit = 20;

  if (!login)
    return yield put(
      enterLoginErrorAction(<FormattedMessage {...messages.loginEmpty} />),
    );
  if (!isNumber.test(login) || login.length > limit)
    return yield put(
      enterLoginErrorAction(<FormattedMessage {...messages.loginError} />),
    );

  try {
    const response = yield call(request, requestURL);

    if (!response.isLogin)
      return yield put(
        enterLoginErrorAction(<FormattedMessage {...messages.loginError} />),
      );

    yield put(enterLoginSuccessAction());
    yield put(stepNextAction());
  } catch (error) {
    yield put(
      enterLoginErrorAction(<FormattedMessage {...messages.serverError} />),
    );
  }
}

export function* handlePassword() {
  const password = yield select(makePasswordSelector());
  const limit = 255;

  if (!password)
    return yield put(
      enterPasswordErrorAction(
        <FormattedMessage {...messages.passwordEmpty} />,
      ),
    );
  if (password.length >= limit)
    return yield put(
      enterPasswordErrorAction(
        <FormattedMessage {...messages.passwordError} />,
      ),
    );

  yield call(loginAttempt);
}

function* loginAttempt() {
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const login = yield select(makeLoginSelector());
  const password = yield select(makePasswordSelector());
  const requestURL = api.getLoginPath();

  if (!login || !password)
    return yield put(
      loginErrorAction(<FormattedMessage {...messages.loginAttemptError} />),
    );

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

    if (!response.success)
      return yield put(
        loginErrorAction(<FormattedMessage {...messages.passwordError} />),
      );

    yield put(enterPasswordSuccessAction());
    auth.setToken(response.token);
    const userId = auth.getUserId();
    yield put(loginSuccessAction());
    yield put(loggedInAction(userId));
    yield put(push('/dashboard'));
  } catch (error) {
    yield put(loginErrorAction(<FormattedMessage {...messages.serverError} />));
  }
}

export default function* loginPageSaga() {
  yield takeLatest(ENTER_LOGIN, handleLogin);
  yield takeLatest(ENTER_PASSWORD, handlePassword);
  yield takeLatest(IS_LOGGED, handleLogged);
}
