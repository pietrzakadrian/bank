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
import env from '../../env';

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
  const requestURL = `${env.API_URL}/api/users/isLogin/${id}`;
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

export function* login() {
  const login = yield select(makeIdSelector());
  const password = yield select(makePasswordSelector());
  const requestURL = `${env.API_URL}/api/users/login`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'CSRF-Token': readCookie('XSRF-TOKEN'),
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
  yield takeLatest(ENTER_ID, isLogin);
  yield takeLatest(ENTER_PASSWORD, login);
}
