import { select, call, put, takeLatest, throttle } from 'redux-saga/effects';
import api from 'api';
import request from 'utils/request';
import { push } from 'connected-react-router';
import {
  makeTokenSelector,
  makeUserIdSelector,
  makeIsOpenNavigationDesktopSelector,
} from 'containers/App/selectors';
import { enqueueSnackbarAction } from 'containers/App/actions';
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
import {
  makeAccountNumberSelector,
  makeAmountMoneySelector,
  makeTransferTitleSelector,
  makeRecipientIdSelector,
  makeAuthorizationKeySelector,
  makeCurrencySelector,
  makeIsSendAuthorizationKeySelector,
} from './selectors';
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

export function* handleCurrency() {
  const token = yield select(makeTokenSelector());
  const userId = yield select(makeUserIdSelector());
  const requestURL = `${api.baseURL}${api.bills.billsPath}${userId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) return yield put(getCurrencyErrorAction('error'));

    const { currency } = response[0].currency;

    yield put(getCurrencySuccessAction(currency));
  } catch (error) {
    yield put(getCurrencyErrorAction(error));
  }
}

export function* searchAccountNumber() {
  const accountNumber = yield select(makeAccountNumberSelector());
  const token = yield select(makeTokenSelector());
  const requestURL = `${api.baseURL}${api.bills.searchPath}${accountNumber}`;
  const limit = 26;
  const isNumber = /^\d+$/;

  if (!isNumber.test(accountNumber))
    return yield put(searchAccountBillsErrorAction('error'));

  if (accountNumber && accountNumber.length !== limit) {
    try {
      const response = yield call(request, requestURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        yield put(searchAccountBillsSuccessAction(response));
      }
    } catch (error) {
      yield put(searchAccountBillsErrorAction(error));
    }
  }
}

export function* handleAccountNumber() {
  const accountNumber = yield select(makeAccountNumberSelector());
  const token = yield select(makeTokenSelector());
  const requestURL = `${api.baseURL}${
    api.bills.isAccountBillPath
  }${accountNumber}`;
  const isNumber = /^\d+$/;
  const limit = 26;

  if (!isNumber.test(accountNumber) || accountNumber.length > limit)
    return yield put(enterAccountNumberErrorAction('error'));

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const { recipientId, isAccountBill } = response;

    if (!isAccountBill)
      return yield put(searchAccountBillsErrorAction('error'));

    yield put(enterAccountNumberSuccessAction(recipientId));
    yield put(stepNextAction());
  } catch (error) {
    yield put(enterAccountNumberErrorAction(error));
  }
}

export function* handleAmountMoney() {
  const amountMoney = yield select(makeAmountMoneySelector());
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const requestURL = `${api.baseURL}${api.bills.isAmountMoneyPath}`;
  const isNumber = /^\d+$/;

  if (!isNumber.test(amountMoney))
    return yield put(enterAmountMoneyErrorAction('error'));

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_sender: userId,
        amount_money: amountMoney,
      }),
    });

    const { isAmountMoney } = response;

    if (!isAmountMoney) return yield put(enterAmountMoneyErrorAction('error'));

    yield put(enterAmountMoneySuccessAction());
    yield put(stepNextAction());
  } catch (error) {
    yield put(enterAmountMoneyErrorAction(error));
  }
}

export function* handleTransferTitle() {
  const transferTitle = yield select(makeTransferTitleSelector());
  const limit = 255;

  if (transferTitle.length > limit)
    return yield put(enterTransferTitleErrorAction('error'));

  yield put(enterTransferTitleSuccessAction());
  yield put(stepNextAction());
}

export function* handleRegisterTransaction() {
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const accountNumber = yield select(makeAccountNumberSelector());
  const amountMoney = yield select(makeAmountMoneySelector());
  const transferTitle = yield select(makeTransferTitleSelector());
  const requestURL = `${api.baseURL}${api.transactions.registerPath}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_sender: userId,
        account_bill: accountNumber,
        amount_money: amountMoney,
        transfer_title: transferTitle,
      }),
    });

    const { success } = response;

    if (success) yield put(sendAuthorizationKeySuccessAction('success'));
  } catch (error) {
    yield put(sendAuthorizationKeyErrorAction(error));
  }
}

export function* handleConfirmTransaction() {
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const recipientId = yield select(makeRecipientIdSelector());
  const accountNumber = yield select(makeAccountNumberSelector());
  const amountMoney = yield select(makeAmountMoneySelector());
  const transferTitle = yield select(makeTransferTitleSelector());
  const authorizationKey = yield select(makeAuthorizationKeySelector());
  const IsOpenNavigationDesktop = yield select(
    makeIsOpenNavigationDesktopSelector(),
  );
  const requestURL = `${api.baseURL}${api.transactions.confirmPath}`;

  try {
    yield put(makePaymentAction());

    const response = yield call(request, requestURL, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_sender: userId,
        account_bill: accountNumber,
        amount_money: amountMoney,
        transfer_title: transferTitle,
        authorization_key: authorizationKey,
      }),
    });

    const { success } = response;

    if (!success) return yield put(makePaymentErrorAction('error'));

    yield put(makePaymentSuccessAction());
    yield put(
      enqueueSnackbarAction({
        message: 'test',
        options: {
          variant: 'success',
          autoHideDuration: 3500,
          className: IsOpenNavigationDesktop
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
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const recipientId = yield select(makeRecipientIdSelector());
  const amountMoney = yield select(makeAmountMoneySelector());
  const transferTitle = yield select(makeTransferTitleSelector());
  const isSendAuthorizationKey = yield select(
    makeIsSendAuthorizationKeySelector(),
  );
  const requestURL = `${api.baseURL}${api.transactions.authorizationKeyPath}`;

  if (!isSendAuthorizationKey)
    return yield put(getAuthorizationKeyErrorAction('error'));

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_sender: userId,
        recipient_id: recipientId,
        amount_money: amountMoney,
        transfer_title: transferTitle,
      }),
    });

    const { success, authorizationKey } = response;

    if (!success) return yield put(getAuthorizationKeyErrorAction('error'));

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
