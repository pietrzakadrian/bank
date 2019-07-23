import { select, call, put, takeLatest, throttle } from 'redux-saga/effects';
import React from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/PaymentPage/messages';

// Import Utils
import request from 'utils/request';
import ApiEndpoint from 'utils/api';

// Import Services
import AuthService from 'services/auth.service';

// Import Selectors
import {
  makeAccountNumberSelector,
  makeAmountMoneySelector,
  makeTransferTitleSelector,
  makeRecipientIdSelector,
  makeAuthorizationKeySelector,
  makeIsSendAuthorizationKeySelector,
} from 'containers/PaymentPage/selectors';
import { makeIsOpenNavigationDesktopSelector } from 'containers/App/selectors';

// Import Actions
import { enqueueSnackbarAction } from 'containers/App/actions';
import {
  searchAccountBillsSuccessAction,
  searchAccountBillsErrorAction,
  enterAccountNumberErrorAction,
  enterAccountNumberSuccessAction,
  stepNextAction,
  enterAmountMoneyErrorAction,
  enterAmountMoneySuccessAction,
  enterTransferTitleErrorAction,
  enterTransferTitleSuccessAction,
  sendAuthorizationKeyErrorAction,
  sendAuthorizationKeySuccessAction,
  makePaymentErrorAction,
  makePaymentSuccessAction,
  makePaymentAction,
  getCurrencyErrorAction,
  getCurrencySuccessAction,
  getAuthorizationKeyErrorAction,
  getAuthorizationKeySuccessAction,
} from './actions';

// Import Constants
import {
  SEARCH_ACCOUNT_BILLS,
  ENTER_ACCOUNT_NUMBER,
  ENTER_AMOUNT_MONEY,
  ENTER_TRANSFER_TITLE,
  SEND_AUTHORIZATION_KEY,
  ENTER_AUTHORIZATION_KEY,
  GET_CURRENCY,
  GET_AUTHORIZATION_KEY,
} from './constants';

export function* handleCurrency() {
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const requestURL = api.getBillsPath();

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const { currency } = response;
    yield put(getCurrencySuccessAction(currency.name));
  } catch (error) {
    yield put(getCurrencyErrorAction(error));
  }
}

export function* searchAccountNumber() {
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const accountBill = yield select(makeAccountNumberSelector());
  const requestURL = api.getSearchPath(accountBill);
  const limit = 26;
  const isNumber = /^\d+$/;

  if (!accountBill)
    return yield put(
      searchAccountBillsErrorAction(
        <FormattedMessage {...messages.errorAccountNumberEmpty} />,
      ),
    );

  if (!isNumber.test(accountBill) || accountBill.length > limit)
    return yield put(
      searchAccountBillsErrorAction(
        <FormattedMessage {...messages.errorAccountNumberValidate} />,
      ),
    );

  if (accountBill.length !== limit) {
    try {
      const response = yield call(request, requestURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const { bills } = response;
      yield put(searchAccountBillsSuccessAction(bills));
    } catch (error) {
      yield put(searchAccountBillsErrorAction(error));
    }
  }
}

export function* handleAccountNumber() {
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const accountBill = yield select(makeAccountNumberSelector());
  const requestURL = api.getIsAccountBillPath(accountBill);
  const isNumber = /^\d+$/;
  const limit = 26;

  if (!accountBill)
    return yield put(
      enterAccountNumberErrorAction(
        <FormattedMessage {...messages.errorAccountNumberEmpty} />,
      ),
    );

  if (!isNumber.test(accountBill) || accountBill.length !== limit)
    return yield put(
      enterAccountNumberErrorAction(
        <FormattedMessage {...messages.errorAccountNumberValidate} />,
      ),
    );

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const {
      isAccountBill,
      recipientId,
      recipientName,
      recipientSurname,
    } = response;

    if (!isAccountBill)
      return yield put(
        searchAccountBillsErrorAction(
          <FormattedMessage {...messages.errorAccountNumberValidate} />,
        ),
      );

    yield put(
      enterAccountNumberSuccessAction(
        recipientId,
        recipientName,
        recipientSurname,
      ),
    );
    yield put(stepNextAction());
  } catch (error) {
    yield put(enterAccountNumberErrorAction(error));
  }
}

export function* handleAmountMoney() {
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const amountMoney = yield select(makeAmountMoneySelector());
  const requestURL = api.getIsAmountMoneyPath(amountMoney);

  if (!amountMoney)
    return yield put(
      enterAmountMoneyErrorAction(
        <FormattedMessage {...messages.errorAmountOfMoneyEmpty} />,
      ),
    );

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const { isAmountMoney } = response;

    if (!isAmountMoney)
      return yield put(
        enterAmountMoneyErrorAction(
          <FormattedMessage {...messages.errorAmountOfMoneyIncorrect} />,
        ),
      );

    yield put(enterAmountMoneySuccessAction());
    yield put(stepNextAction());
  } catch (error) {
    yield put(enterAmountMoneyErrorAction(error));
  }
}

export function* handleTransferTitle() {
  const transferTitle = yield select(makeTransferTitleSelector());
  const limit = 255;

  if (!transferTitle)
    return yield put(
      enterTransferTitleErrorAction(
        <FormattedMessage {...messages.errorTransferTitleIncorrect} />,
      ),
    );

  if (transferTitle.length > limit)
    return yield put(
      enterTransferTitleErrorAction(
        <FormattedMessage {...messages.errorTransferTitleLenght} />,
      ),
    );

  yield put(enterTransferTitleSuccessAction());
  yield put(stepNextAction());
}

export function* handleRegisterTransaction() {
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const accountBill = yield select(makeAccountNumberSelector());
  const amountMoney = yield select(makeAmountMoneySelector());
  const transferTitle = yield select(makeTransferTitleSelector());
  const requestURL = api.getCreatePath();

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        accountBill,
        amountMoney,
        transferTitle,
      }),
    });

    const { success } = response;
    if (!success) return yield put(sendAuthorizationKeyErrorAction('error'));

    yield put(
      sendAuthorizationKeySuccessAction(
        <FormattedMessage {...messages.keyHasBeenSent} />,
      ),
    );
  } catch (error) {
    yield put(sendAuthorizationKeyErrorAction(error));
  }
}

export function* handleConfirmTransaction() {
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const accountBill = yield select(makeAccountNumberSelector());
  const amountMoney = yield select(makeAmountMoneySelector());
  const transferTitle = yield select(makeTransferTitleSelector());
  const authorizationKey = yield select(makeAuthorizationKeySelector());
  const isOpenNavigationDesktop = yield select(
    makeIsOpenNavigationDesktopSelector(),
  );
  const requestURL = api.getConfirmPath();

  if (!authorizationKey)
    return yield put(
      makePaymentErrorAction(
        <FormattedMessage {...messages.emptyKeyIncorrect} />,
      ),
    );

  try {
    yield put(makePaymentAction());

    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        accountBill,
        amountMoney,
        transferTitle,
        authorizationKey,
      }),
    });

    const { success } = response;

    if (!success)
      return yield put(
        makePaymentErrorAction(
          <FormattedMessage {...messages.errorKeyIncorrect} />,
        ),
      );

    yield put(makePaymentSuccessAction());
    yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...messages.paymentHasBeenSent} />,
        options: {
          variant: 'success',
          autoHideDuration: 3500,
          className: isOpenNavigationDesktop
            ? 'snackbar__provider--open-menu'
            : 'snackbar__provider--close-menu',
        },
      }),
    );
    yield put(push('/dashboard'));
  } catch (error) {
    yield put(makePaymentErrorAction(error));
  }
}

export function* handleAuthorizationKey() {
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const recipientId = yield select(makeRecipientIdSelector());
  const isSendAuthorizationKey = yield select(
    makeIsSendAuthorizationKeySelector(),
  );
  const requestURL = api.getAuthorizationKeyPath(recipientId);

  if (!isSendAuthorizationKey)
    return yield put(
      getAuthorizationKeyErrorAction(
        <FormattedMessage {...messages.errorKeyServer} />,
      ),
    );

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const { success, authorizationKey } = response;

    if (!success)
      return yield put(
        getAuthorizationKeyErrorAction(
          <FormattedMessage {...messages.errorKeyServer} />,
        ),
      );

    yield put(getAuthorizationKeySuccessAction(authorizationKey));
  } catch (error) {
    yield put(getAuthorizationKeyErrorAction(error));
  }
}

export default function* paymentPageSaga() {
  yield takeLatest(GET_CURRENCY, handleCurrency);
  yield throttle(1000, SEARCH_ACCOUNT_BILLS, searchAccountNumber);
  yield takeLatest(ENTER_ACCOUNT_NUMBER, handleAccountNumber);
  yield takeLatest(ENTER_AMOUNT_MONEY, handleAmountMoney);
  yield takeLatest(ENTER_TRANSFER_TITLE, handleTransferTitle);
  yield takeLatest(SEND_AUTHORIZATION_KEY, handleRegisterTransaction);
  yield takeLatest(ENTER_AUTHORIZATION_KEY, handleConfirmTransaction);
  yield takeLatest(GET_AUTHORIZATION_KEY, handleAuthorizationKey);
}
