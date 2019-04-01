import React from 'react';
import request from 'utils/request';
import { select, call, put, takeLatest, throttle } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { successLogoutAction } from 'components/App/Header/actions';
import { FormattedMessage } from 'react-intl';
import { makeUserIdSelector } from 'containers/App/selectors';
import { enqueueSnackbarAction } from 'containers/App/actions';
import socketIOClient from 'socket.io-client';
import messages from './messages';

import {
  searchAccountBillsSuccessAction,
  searchAccountBillsErrorAction,
  successAccountNumberAction,
  paymentStepNextAction,
  successAmountMoneyAction,
  errorAmountMoneyAction,
  successTransferTitleAction,
  sendAuthorizationKeySuccessAction,
  sendAuthorizationKeyErrorAction,
  makePaymentSuccessAction,
  makePaymentErrorAction,
  errorTransferTitleAction,
} from './actions';

import {
  SEARCH_ACCOUNT_BILLS,
  ENTER_ACCOUNT_NUMBER,
  ENTER_AMOUNT_MONEY,
  ENTER_TRANSFER_TITLE,
  ENTER_AUTHORIZATION_KEY,
  SEND_AUTHORIZATION_KEY,
} from './constants';
import {
  makeValueSelector,
  makeAmountMoneySelector,
  makeTransferTitleSelector,
  makeAuthorizationKeySelector,
  makeIsAmountMoneySelector,
  makeIsAccountBillSelector,
  makeRecipientIdSelector,
} from './selectors';

function* getToken() {
  // Retrieves the user token from localStorage
  return localStorage.getItem('id_token');
}

export function* searchAccountNumber() {
  const jwt = yield call(getToken);
  const accountNumber = yield select(makeValueSelector());
  const requestURL = `/api/bills/search/${accountNumber}`;

  if (accountNumber && accountNumber.length !== 26) {
    try {
      const response = yield call(request, requestURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });

      response
        ? yield put(searchAccountBillsSuccessAction(response))
        : yield put(searchAccountBillsErrorAction('error'));
    } catch (err) {
      yield put(successLogoutAction());
      yield put(push('/login'));
    }
  }
}

export function* isAccountBill() {
  const jwt = yield call(getToken);
  const accountNumber = yield select(makeValueSelector());
  const requestURL = `/api/bills/isAccountBill/${accountNumber}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });

    response.isAccountBill
      ? (yield put(successAccountNumberAction(response.recipientId)),
       yield put(paymentStepNextAction()))
      : yield put(
        searchAccountBillsErrorAction(
          <FormattedMessage {...messages.errorAccountNumberValidate} />,
        ),
      );
  } catch (err) {
    /* just ignore */
  }
}

export function* isAmountMoney() {
  const jwt = yield call(getToken);
  const id_sender = yield select(makeUserIdSelector());
  const amount_money = yield select(makeAmountMoneySelector());
  const requestURL = `/api/bills/isAmountMoney`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        id_sender,
        amount_money,
      }),
    });

    response.isAmountMoney
      ? (yield put(successAmountMoneyAction()),
        yield put(paymentStepNextAction()))
      : yield put(
          errorAmountMoneyAction(
            <FormattedMessage {...messages.errorAmountOfMoneyIncorrect} />,
          ),
        );
  } catch (err) {
    /* just ignore */
  }
}

export function* isTransferTitle() {
  const title = yield select(makeTransferTitleSelector());
  const limit = 15;

  if (title.length > limit) {
    yield put(
      errorTransferTitleAction(
        <FormattedMessage {...messages.errorTransferTitleLenght} />,
      ),
    );
  } else {
    yield put(successTransferTitleAction());
    yield put(paymentStepNextAction());
  }
}

export function* registerTransaction() {
  const jwt = yield call(getToken);
  const id_sender = yield select(makeUserIdSelector());
  const account_bill = yield select(makeValueSelector());
  const amount_money = yield select(makeAmountMoneySelector());
  const transfer_title = yield select(makeTransferTitleSelector());
  const isAmountMoney = yield select(makeIsAmountMoneySelector());
  const isAccountBill = yield select(makeIsAccountBillSelector());

  const requestURL = `/api/transactions/register`;

  if (isAmountMoney && isAccountBill) {
    try {
      const response = yield call(request, requestURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          id_sender,
          account_bill,
          amount_money,
          transfer_title,
        }),
      });

      response.success
        ? yield put(
            sendAuthorizationKeySuccessAction(
              <FormattedMessage {...messages.keyHasBeenSent} />,
            ),
          )
        : yield put(
          sendAuthorizationKeyErrorAction(
            <FormattedMessage {...messages.errorAmountOfMoneyIncorrect} />,
          ),
        );
    } catch (err) {
      /* just ignore */
    }
  }
}

export function* confirmTransaction() {
  const jwt = yield call(getToken);
  const id_sender = yield select(makeUserIdSelector());
  const recipientId = yield select(makeRecipientIdSelector());
  const account_bill = yield select(makeValueSelector());
  const amount_money = yield select(makeAmountMoneySelector());
  const transfer_title = yield select(makeTransferTitleSelector());
  const authorization_key = yield select(makeAuthorizationKeySelector());
  const isAmountMoney = yield select(makeIsAmountMoneySelector());
  const isAccountBill = yield select(makeIsAccountBillSelector());
  const socket = socketIOClient('/');
  const requestURL = `/api/transactions`;

  if (isAmountMoney && isAccountBill) {
    try {
      const response = yield call(request, requestURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          id_sender,
          account_bill,
          amount_money,
          transfer_title,
          authorization_key,
        }),
      });

      response.success
        ? (yield put(makePaymentSuccessAction()),
          socket.emit('new notification', recipientId),
        yield put(
          enqueueSnackbarAction({
            message: <FormattedMessage {...messages.paymentHasBeenSent} />,
            options: {
              variant: 'success',
              autoHideDuration: 2000,
            },
          }),
        ),
        yield put(push('/dashboard')))
        : yield put(
          makePaymentErrorAction(
            <FormattedMessage {...messages.errorKeyIncorrect} />,
          ),
        );
    } catch (err) {
      /* just ignore */
    }
  }
}

export default function* paymentPageSaga() {
  yield throttle(1000, SEARCH_ACCOUNT_BILLS, searchAccountNumber);
  yield takeLatest(ENTER_ACCOUNT_NUMBER, isAccountBill);
  yield takeLatest(ENTER_AMOUNT_MONEY, isAmountMoney);
  yield takeLatest(ENTER_TRANSFER_TITLE, isTransferTitle);
  yield takeLatest(SEND_AUTHORIZATION_KEY, registerTransaction);
  yield takeLatest(ENTER_AUTHORIZATION_KEY, confirmTransaction);
}
