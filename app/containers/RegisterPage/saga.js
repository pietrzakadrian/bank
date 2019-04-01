import React from 'react';
import { FormattedMessage } from 'react-intl';
import request from 'utils/request';
import { push } from 'connected-react-router/immutable';
import { takeLatest, call, put, select } from 'redux-saga/effects';

import { enqueueSnackbarAction } from 'containers/App/actions';
import {
  ENTER_ID,
  ENTER_PASSWORD,
  ENTER_NAME,
  ENTER_SURNAME,
  ENTER_EMAIL,
} from './constants';
import messages from './messages';
import {
  makeIdSelector,
  makeEmailSelector,
  makePasswordSelector,
  makeNameSelector,
  makeSurnameSelector,
} from './selectors';

import {
  successIdAction,
  errorIdAction,
  successPasswordAction,
  errorPasswordAction,
  successNameAction,
  errorNameAction,
  successSurnameAction,
  errorSurnameAction,
  successEmailAction,
  errorEmailAction,
  successRegisterAction,
  errorRegisterAction,
  registerStepNextAction,
} from './actions';

export function* isLogin() {
  const id = yield select(makeIdSelector());
  const re = /[0-9]+/g;
  const requestURL = `/api/users/isLogin/${id}`;
  const limit = 12;

  if (!re.test(id)) {
    yield put(errorIdAction(<FormattedMessage {...messages.invalidId} />));
  } else if (id.length > limit) {
    yield put(
      errorIdAction(<FormattedMessage {...messages.invalidIdLenght} />),
    );
  } else {
    try {
      // Call our request helper (see 'utils/request')
      const response = yield call(request, requestURL);

      if (!response.isLogin) {
        yield put(successIdAction());
        yield put(registerStepNextAction());
      } else {
        yield put(
          errorIdAction(<FormattedMessage {...messages.inputIDExists} />),
        );
      }
    } catch (err) {
      yield put(
        errorRegisterAction(<FormattedMessage {...messages.serverError} />),
      );
    }
  }
}

export function* isPassword() {
  const password = yield select(makePasswordSelector());
  const min = 2;

  if (password.length < min) {
    yield put(
      errorPasswordAction(
        <FormattedMessage {...messages.errorLenghtPassword} />,
      ),
    );
  } else {
    yield put(successPasswordAction());
    yield put(registerStepNextAction());
  }
}

export function* isName() {
  const name = yield select(makeNameSelector());
  const re = /^[A-Za-z]+$/;
  const limit = 12;

  if (!re.test(name)) {
    yield put(errorNameAction(<FormattedMessage {...messages.errorName} />));
  } else if (name.length > limit) {
    yield put(
      errorNameAction(<FormattedMessage {...messages.errorNameLenght} />),
    );
  } else {
    yield put(successNameAction());
    yield put(registerStepNextAction());
  }
}

export function* isSurname() {
  const surname = yield select(makeSurnameSelector());
  const re = /^[A-Za-z]+$/;
  const limit = 12;

  if (!re.test(surname)) {
    yield put(
      errorSurnameAction(<FormattedMessage {...messages.errorSurname} />),
    );
  } else if (surname.length > limit) {
    yield put(
      errorSurnameAction(<FormattedMessage {...messages.errorSurnameLenght} />),
    );
  } else {
    yield put(successSurnameAction());
    yield put(registerStepNextAction());
  }
}

export function* isEmail() {
  // Select username from store
  const email = yield select(makeEmailSelector());
  const requestURL = `/api/users/isEmail/${email}`;
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const limit = 25;

  if (!re.test(email)) {
    yield put(
      errorEmailAction(<FormattedMessage {...messages.errorIncorrectEmail} />),
    );
  } else if (email.length > limit) {
    yield put(
      errorEmailAction(<FormattedMessage {...messages.errorEmailLenght} />),
    );
  } else {
    try {
      // Call our request helper (see 'utils/request')
      const response = yield call(request, requestURL);

      if (!response.isEmail) {
        yield put(successEmailAction());
        yield call(register);
      } else {
        yield put(
          errorEmailAction(
            <FormattedMessage {...messages.existAccountWithSameEmail} />,
          ),
        );
      }
    } catch (err) {
      yield put(
        errorRegisterAction(<FormattedMessage {...messages.serverError} />),
      );
    }
  }
}

function* register() {
  const login = yield select(makeIdSelector());
  const password = yield select(makePasswordSelector());
  const name = yield select(makeNameSelector());
  const surname = yield select(makeSurnameSelector());
  const email = yield select(makeEmailSelector());
  const requestURL = `/api/users/register`;

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
        name,
        surname,
        email,
      }),
    });

    if (response.success) {
      yield put(
        enqueueSnackbarAction({
          message: <FormattedMessage {...messages.succesCreated} />,
          options: {
            variant: 'success',
            autoHideDuration: 2000,
          },
        }),
      );
      yield put(successRegisterAction());
      yield put(push('/login'));
    } else {
      yield put(
        errorRegisterAction(<FormattedMessage {...messages.errorServer} />),
      );
    }
  } catch (err) {
    yield put(
      errorRegisterAction(<FormattedMessage {...messages.serverError} />),
    );
  }
}

// Individual exports for testing
export default function* registerPageSaga() {
  yield takeLatest(ENTER_ID, isLogin);
  yield takeLatest(ENTER_PASSWORD, isPassword);
  yield takeLatest(ENTER_NAME, isName);
  yield takeLatest(ENTER_SURNAME, isSurname);
  yield takeLatest(ENTER_EMAIL, isEmail);
}
