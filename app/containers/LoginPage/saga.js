/* eslint-disable no-shadow */
/**
 * Gets the repositories of the user from Github
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { push } from 'connected-react-router/immutable';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { ENTER_ID, ENTER_PASSWORD } from './constants';
import messages from './messages';
import { makeIdSelector, makePasswordSelector } from './selectors';
import {
  successIdAction,
  errorIdAction,
  errorPasswordAction,
  successPasswordAction,
  successLoginAction,
  errorLoginAction,
} from './actions';

export function* isLogin() {
  // Select username from store
  const id = yield select(makeIdSelector());
  const requestURL = `/api/users/isLogin/${id}`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL);
    response.isLogin
      ? yield put(successIdAction())
      : yield put(errorIdAction(<FormattedMessage {...messages.loginError} />));
  } catch (err) {
    yield put(errorIdAction(<FormattedMessage {...messages.serverError} />));
  }
}

export function* login() {
  const login = yield select(makeIdSelector());
  const password = yield select(makePasswordSelector());
  const requestURL = `/api/users/login`;

  try {
    // Call our request helper (see 'utils/request')
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

    if (response.success) {
      yield put(successPasswordAction());
      yield put(successLoginAction(response.token));
      yield put(push('/dashboard'));
    } else {
      yield put(
        errorPasswordAction(<FormattedMessage {...messages.passwordError} />),
      );
    }
  } catch (err) {
    yield put(errorLoginAction(<FormattedMessage {...messages.serverError} />));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginPageData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(ENTER_ID, isLogin);
  yield takeLatest(ENTER_PASSWORD, login);
}
