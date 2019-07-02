import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';
import { format } from 'date-fns';
import {
  BORDER_GREY_LIGHT,
  PRIMARY_BLUE_LIGHT,
  PRIMARY_RED,
} from 'utils/colors';
import {
  makeUserIdSelector,
  makeTokenSelector,
} from 'containers/App/selectors';
import { logoutErrorAction } from 'containers/App/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import api from 'api';
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
import {
  getNameErrorAction,
  getSurnameAction,
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
  getSavingsErrorAction,
  getIncomingTransfersSumSuccessAction,
  getIncomingTransfersSumErrorAction,
  getOutgoingTransfersSumSuccessAction,
  getOutgoingTransfersSumErrorAction,
  getAccountBillsSuccessAction,
  getAccountBillsErrorAction,
  getRechartsDataErrorAction,
  getCurrencyIdSuccessAction,
  getCurrencyIdErrorAction,
  getSurnameErrorAction,
} from './actions';
import {
  makeRecentTransactionsSenderSelector,
  makeRecentTransactionsRecipientSelector,
  makeOutgoingTransfersSumSelector,
  makeIncomingTransfersSumSelector,
} from './selectors';

export function* handleUserdata() {
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const locale = yield select(makeSelectLocale());
  const requestURL = `${api.baseURL}${api.users.userPath}${userId}`;

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
      const {
        name,
        surname,
        email,
        last_present_logged,
        last_successful_logged,
        last_failed_logged,
      } = response.user;
      const lastPresentLogged = format(
        last_present_logged,
        `DD.MM.YYYY, ${locale === 'en' ? 'hh:MM A' : 'HH:MM'}`,
      );
      const lastSuccessfulLogged = format(
        last_successful_logged,
        `DD.MM.YYYY, ${locale === 'en' ? 'hh:MM A' : 'HH:MM'}`,
      );
      const lastFailedLogged = format(
        last_failed_logged,
        `DD.MM.YYYY, ${locale === 'en' ? 'hh:MM A' : 'HH:MM'}`,
      );

      if (!name) yield put(getNameErrorAction('error'));
      else yield put(getNameSuccessAction(name));

      if (!surname) yield put(getSurnameErrorAction('error'));
      else yield put(getSurnameSuccessAction(surname));

      if (!email) yield put(getEmailErrorAction('error'));
      else yield put(getEmailSuccessAction(email));

      if (!lastPresentLogged)
        yield put(getLastPresentLoggedErrorAction('error'));
      else yield put(getLastPresentLoggedSuccessAction(lastPresentLogged));

      if (!lastSuccessfulLogged)
        yield put(getLastSuccessfulLoggedErrorAction('error'));
      else
        yield put(getLastSuccessfulLoggedSuccessAction(lastSuccessfulLogged));

      if (!lastFailedLogged) yield put(getLastFailedLoggedErrorAction('error'));
      else yield put(getLastFailedLoggedSuccessAction(lastFailedLogged));
    }
  } catch (error) {
    yield put(logoutErrorAction(error));
    yield put(push('/'));
  }
}

export function* handleAccountingData() {
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
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

    if (response) {
      const transformAccountingData = response.map(({ ...accountingData }) => ({
        accountBill: accountingData.account_bill,
        currency: accountingData.currency.currency,
        currencyId: accountingData.currency.id,
        availableFunds: accountingData.available_funds,
        additionals: {
          accountBalanceHistory:
            accountingData.additionals[0].account_balance_history,
          incomingTransfersSum:
            accountingData.additionals[0].incoming_transfers_sum,
          outgoingTransfersSum:
            accountingData.additionals[0].outgoing_transfers_sum,
        },
      }))[0];

      if (
        transformAccountingData.availableFunds ||
        transformAccountingData.availableFunds === 0
      )
        yield put(
          getAvailableFundsSuccessAction(
            transformAccountingData.availableFunds
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
              .replace('.', ','),
          ),
        );
      else yield put(getAvailableFundsErrorAction('error'));

      if (transformAccountingData.accountBill)
        yield put(
          getAccountBillsSuccessAction(
            transformAccountingData.accountBill
              .toString()
              .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
              .trim(),
          ),
        );
      else yield put(getAccountBillsErrorAction('error'));

      if (transformAccountingData.additionals.accountBalanceHistory)
        yield put(
          getAccountBalanceHistorySuccessAction(
            JSON.parse(
              `[${transformAccountingData.additionals.accountBalanceHistory}]`,
            ),
          ),
        );
      else getAccountBalanceHistoryErrorAction('error');

      if (transformAccountingData.currency)
        yield put(getCurrencySuccessAction(transformAccountingData.currency));
      else yield put(getCurrencyErrorAction('error'));

      if (transformAccountingData.currencyId)
        yield put(
          getCurrencyIdSuccessAction(transformAccountingData.currencyId),
        );
      else yield put(getCurrencyIdErrorAction('error'));

      if (
        transformAccountingData.additionals.incomingTransfersSum ||
        transformAccountingData.additionals.incomingTransfersSum === 0
      )
        yield put(
          getIncomingTransfersSumSuccessAction(
            transformAccountingData.additionals.incomingTransfersSum,
          ),
        );
      else yield put(getIncomingTransfersSumErrorAction('error'));

      if (
        transformAccountingData.additionals.outgoingTransfersSum ||
        transformAccountingData.additionals.outgoingTransfersSum === 0
      )
        yield put(
          getOutgoingTransfersSumSuccessAction(
            transformAccountingData.additionals.outgoingTransfersSum,
          ),
        );
      else yield put(getOutgoingTransfersSumErrorAction('error'));
    }

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
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const requestURL = `${api.baseURL}${api.transactions.senderPath}${userId}`;

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
      const recentTransactionsSender = response.map(({ ...transaction }) => ({
        id_sender: transaction.id_sender,
        amount_money: `-${transaction.amount_money
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
          .replace('.', ',')}`,
        recipient: {
          id: transaction.id_recipient,
          name: transaction.getRecipientdata.name,
          surname: transaction.getRecipientdata.surname,
        },
        currency: transaction.currency.currency,
        transfer_title: transaction.transfer_title,
        date_time: transaction.date_time,
      }));

      yield put(
        getRecentTransactionsSenderSuccessAction(recentTransactionsSender),
      );
    } else yield put(getRecentTransactionsSenderErrorAction('error'));
  } catch (error) {
    yield put(getRecentTransactionsSenderErrorAction(error));
  }
}

function* getRecentTransactionsRecipient() {
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const requestURL = `${api.baseURL}${api.transactions.recipientPath}${userId}`;

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
      const recentTransactionsRecipient = response.map(
        ({ ...transaction }) => ({
          amount_money: transaction.amount_money
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
            .replace('.', ','),
          sender: {
            id: transaction.id_sender,
            name: transaction.getSenderdata.name,
            surname: transaction.getSenderdata.surname,
          },
          date_time: transaction.date_time,
          currency: transaction.currency.currency,
          id_recipient: transaction.id_recipient,
          transfer_title: transaction.transfer_title,
        }),
      );

      yield put(
        getRecentTransactionsRecipientSuccessAction(
          recentTransactionsRecipient,
        ),
      );
    } else yield put(getRecentTransactionsRecipientErrorAction('error'));
  } catch (error) {
    yield put(getRecentTransactionsSenderErrorAction(error));
  }
}

function* handleRecharts() {
  const recentTransactionsSender = yield select(
    makeRecentTransactionsSenderSelector(),
  );
  const recentTransactionsRecipient = yield select(
    makeRecentTransactionsRecipientSelector(),
  );
  const outgoingTransfersSum = yield select(makeOutgoingTransfersSumSelector());
  const incomingTransfersSum = yield select(makeIncomingTransfersSumSelector());

  try {
    if (recentTransactionsSender === 0 && recentTransactionsRecipient === 0) {
      yield put(
        getRechartsColorsSuccessAction(JSON.parse(`["${BORDER_GREY_LIGHT}"]`)),
      );
      yield put(getRechartsDataSuccessAction([{ name: 'Group A', value: 1 }]));
      yield put(getSavingsSuccessAction(0));
    } else {
      yield put(
        getRechartsColorsSuccessAction(
          JSON.parse(`["${PRIMARY_BLUE_LIGHT}", "${PRIMARY_RED}"]`),
        ),
      );

      yield put(
        getRechartsDataSuccessAction([
          {
            name: 'Group A',
            value: incomingTransfersSum,
          },
          {
            name: 'Group B',
            value: outgoingTransfersSum,
          },
        ]),
      );

      const rechartsProcent =
        (incomingTransfersSum * 100) /
          (parseFloat(incomingTransfersSum) +
            parseFloat(outgoingTransfersSum)) || 0;

      yield put(
        getSavingsSuccessAction(rechartsProcent.toFixed(1).replace('.', ',')),
      );
    }
  } catch (error) {
    yield put(getRechartsColorsSuccessAction(error));
    yield put(getRechartsDataErrorAction(error));
    yield put(getSavingsErrorAction(error));
  }
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
