import { call, put, select, takeLatest } from 'redux-saga/effects';
import { format } from 'date-fns';

// Import Services
import AuthService from 'services/auth.service';

// Import Utils
import {
  BORDER_GREY_LIGHT,
  PRIMARY_BLUE_LIGHT,
  PRIMARY_RED,
} from 'utils/colors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  makeOutgoingTransfersSumSelector,
  makeIncomingTransfersSumSelector,
} from 'containers/DashboardPage/selectors';

// Import Actions
import {
  getNameErrorAction,
  getEmailErrorAction,
  getLastSuccessfulLoggedErrorAction,
  getLastPresentLoggedErrorAction,
  getLastFailedLoggedErrorAction,
  getNameSuccessAction,
  getSurnameSuccessAction,
  getEmailSuccessAction,
  getLastSuccessfulLoggedSuccessAction,
  getLastPresentLoggedSuccessAction,
  getLastFailedLoggedSuccessAction,
  getAvailableFundsSuccessAction,
  getAvailableFundsErrorAction,
  getAccountBalanceHistorySuccessAction,
  getAccountBalanceHistoryErrorAction,
  getCurrencySuccessAction,
  getCurrencyErrorAction,
  getRecentTransactionsSenderErrorAction,
  getRecentTransactionsSenderSuccessAction,
  getRecentTransactionsRecipientSuccessAction,
  getRecentTransactionsRecipientErrorAction,
  getRechartsColorsSuccessAction,
  getRechartsDataSuccessAction,
  getSavingsSuccessAction,
  getIncomingTransfersSumSuccessAction,
  getIncomingTransfersSumErrorAction,
  getOutgoingTransfersSumSuccessAction,
  getOutgoingTransfersSumErrorAction,
  getAccountBillsSuccessAction,
  getAccountBillsErrorAction,
  getCurrencyIdSuccessAction,
  getCurrencyIdErrorAction,
  getSurnameErrorAction,
} from './actions';

// Import Constants
import {
  GET_NAME,
  GET_SURNAME,
  GET_LAST_PRESENT_LOGGED,
  GET_LAST_SUCCESSFUL_LOGGED,
  GET_LAST_FAILED_LOGGED,
  GET_EMAIL,
  GET_AVAILABLE_FUNDS,
  GET_ACCOUNT_BALANCE_HISTORY,
  GET_CURRENCY,
  GET_RECHARTS_DATA,
  GET_RECHARTS_COLORS,
  GET_SAVINGS,
  GET_ACCOUNT_BILLS,
  GET_RECENT_TRANSACTIONS_RECIPIENT,
  GET_RECENT_TRANSACTIONS_SENDER,
} from './constants';

export function* handleUserdata() {
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const locale = yield select(makeSelectLocale());
  const requestURL = api.getUsersPath();

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
      name,
      surname,
      email,
      lastPresentLoggedDate,
      lastSuccessfulLoggedDate,
      lastFailedLoggedDate,
    } = response;

    const formatLastPresentLoggedDate = format(
      lastPresentLoggedDate,
      `DD.MM.YYYY, ${locale === 'en' ? 'hh:MM A' : 'HH:MM'}`,
    );
    const formatLastSuccessfulLoggedDate = format(
      lastSuccessfulLoggedDate,
      `DD.MM.YYYY, ${locale === 'en' ? 'hh:MM A' : 'HH:MM'}`,
    );
    const formatLastFailedLoggedDate = format(
      lastFailedLoggedDate,
      `DD.MM.YYYY, ${locale === 'en' ? 'hh:MM A' : 'HH:MM'}`,
    );

    yield put(getNameSuccessAction(name));
    yield put(getSurnameSuccessAction(surname));
    yield put(getEmailSuccessAction(email));
    if (lastPresentLoggedDate !== null)
      yield put(getLastPresentLoggedSuccessAction(formatLastPresentLoggedDate));

    if (lastSuccessfulLoggedDate !== null)
      yield put(
        getLastSuccessfulLoggedSuccessAction(formatLastSuccessfulLoggedDate),
      );

    if (lastFailedLoggedDate !== null)
      yield put(getLastFailedLoggedSuccessAction(formatLastFailedLoggedDate));
  } catch (error) {
    yield put(getNameErrorAction(error));
    yield put(getSurnameErrorAction(error));
    yield put(getEmailErrorAction(error));
    yield put(getLastPresentLoggedErrorAction(error));
    yield put(getLastSuccessfulLoggedErrorAction(error));
    yield put(getLastFailedLoggedErrorAction(error));
  }
}

export function* handleAccountingData() {
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

    const { availableFunds, accountBill, currency, additionals } = response;

    if (availableFunds || availableFunds === 0)
      yield put(
        getAvailableFundsSuccessAction(
          availableFunds
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
            .replace('.', ','),
        ),
      );
    else yield put(getAvailableFundsErrorAction('error'));

    if (accountBill)
      yield put(
        getAccountBillsSuccessAction(
          accountBill.replace(/(^\d{2}|\d{4})+?/g, '$1 ').trim(),
        ),
      );
    else yield put(getAccountBillsErrorAction('error'));

    if (additionals.accountBalanceHistory)
      yield put(
        getAccountBalanceHistorySuccessAction(
          JSON.parse(`[${additionals.accountBalanceHistory}]`),
        ),
      );
    else getAccountBalanceHistoryErrorAction('error');

    if (currency.name) yield put(getCurrencySuccessAction(currency.name));
    else yield put(getCurrencyErrorAction('error'));

    if (currency.id) yield put(getCurrencyIdSuccessAction(currency.id));
    else yield put(getCurrencyIdErrorAction('error'));

    if (
      additionals.incomingTransfersSum ||
      additionals.incomingTransfersSum === 0
    )
      yield put(
        getIncomingTransfersSumSuccessAction(additionals.incomingTransfersSum),
      );
    else yield put(getIncomingTransfersSumErrorAction('error'));

    if (
      additionals.outgoingTransfersSum ||
      additionals.outgoingTransfersSum === 0
    )
      yield put(
        getOutgoingTransfersSumSuccessAction(additionals.outgoingTransfersSum),
      );
    else yield put(getOutgoingTransfersSumErrorAction('error'));

    yield call(handleRecharts);
  } catch (error) {
    yield put(getAvailableFundsErrorAction(error));
    yield put(getAccountBalanceHistoryErrorAction(error));
    yield put(getCurrencyErrorAction(error));
  }
}

export function* handleRecentTransactions() {
  yield call(getRecentTransactionsSender);
  yield call(getRecentTransactionsRecipient);
}

function* getRecentTransactionsSender() {
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const userId = auth.getUserId();
  const requestURL = api.getSenderPath();

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const { senderTransactions } = response;
    const transformSenderTransactions = senderTransactions.map(
      ({ ...transaction }) => ({
        id_sender: userId,
        amount_money: `-${transaction.transaction_amountMoney
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
          .replace('.', ',')}`,
        recipient: {
          id: transaction.user_id,
          name: transaction.user_name,
          surname: transaction.user_surname,
        },
        currency: transaction.currency_name,
        transfer_title: transaction.transaction_transferTitle,
        date_time: transaction.transaction_createdDate,
      }),
    );

    yield put(
      getRecentTransactionsSenderSuccessAction(transformSenderTransactions),
    );
  } catch (error) {
    yield put(getRecentTransactionsSenderErrorAction(error));
  }
}

function* getRecentTransactionsRecipient() {
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const userId = auth.getUserId();
  const requestURL = api.getRecipientPath();

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const { recipientTransactions } = response;

    const transformRecipientTransactions = recipientTransactions.map(
      ({ ...transaction }) => ({
        amount_money: transaction.transaction_amountMoney
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
          .replace('.', ','),
        sender: {
          id: transaction.user_id,
          name: transaction.user_name,
          surname: transaction.user_surname,
        },
        date_time: transaction.transaction_createdDate,
        currency: transaction.currency_name,
        id_recipient: userId,
        transfer_title: transaction.transaction_transferTitle,
      }),
    );

    yield put(
      getRecentTransactionsRecipientSuccessAction(
        transformRecipientTransactions,
      ),
    );
  } catch (error) {
    yield put(getRecentTransactionsRecipientErrorAction(error));
  }
}

function* handleRecharts() {
  const outgoingTransfersSum = yield select(makeOutgoingTransfersSumSelector());
  const incomingTransfersSum = yield select(makeIncomingTransfersSumSelector());
  const incomingRechartsProcent =
    100 - (outgoingTransfersSum * 100) / incomingTransfersSum;
  const outgoingRechartsProcent =
    (outgoingTransfersSum * 100) / incomingTransfersSum;
  const zero = 0;

  if (!incomingTransfersSum && !outgoingTransfersSum) {
    yield put(
      getRechartsColorsSuccessAction(JSON.parse(`["${BORDER_GREY_LIGHT}"]`)),
    );

    yield put(getRechartsDataSuccessAction([{ name: 'Group A', value: 1 }]));

    return yield put(
      getSavingsSuccessAction(zero.toFixed(1).replace('.', ',')),
    );
  }

  yield put(
    getRechartsColorsSuccessAction(
      JSON.parse(`["${PRIMARY_BLUE_LIGHT}", "${PRIMARY_RED}"]`),
    ),
  );

  yield put(
    getRechartsDataSuccessAction([
      {
        name: 'Group A',
        value: incomingRechartsProcent,
      },
      {
        name: 'Group B',
        value: outgoingRechartsProcent,
      },
    ]),
  );

  return yield put(
    getSavingsSuccessAction(
      incomingRechartsProcent.toFixed(1).replace('.', ','),
    ),
  );
}

export default function* dashboardPageSaga() {
  yield takeLatest(
    GET_NAME ||
      GET_SURNAME ||
      GET_EMAIL ||
      GET_LAST_FAILED_LOGGED ||
      GET_LAST_PRESENT_LOGGED ||
      GET_LAST_SUCCESSFUL_LOGGED,
    handleUserdata,
  );

  yield takeLatest(
    GET_AVAILABLE_FUNDS ||
      GET_ACCOUNT_BILLS ||
      GET_ACCOUNT_BALANCE_HISTORY ||
      GET_CURRENCY ||
      GET_RECHARTS_DATA ||
      GET_RECHARTS_COLORS ||
      GET_SAVINGS,
    handleAccountingData,
  );

  yield takeLatest(
    GET_RECENT_TRANSACTIONS_RECIPIENT || GET_RECENT_TRANSACTIONS_SENDER,
    handleRecentTransactions,
  );
}
