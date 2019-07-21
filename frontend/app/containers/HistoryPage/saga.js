/* eslint-disable prettier/prettier */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { format } from 'date-fns';
import api from 'api';

// Import Selectors
import {
  makeUserIdSelector,
  makeTokenSelector,
} from 'containers/App/selectors';
import { makePageSizeSelector, makeCurrentPageSelector } from 'containers/HistoryPage/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

// Import Constants
import { GET_GRID_DATA, CHANGE_PAGE } from './constants';

// Import Actions
import { getGridDataErrorAction, getGridDataSuccessAction } from './actions';

export function* handleGridData() {
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const locale = yield select(makeSelectLocale());
  const pageSize = yield select(makePageSizeSelector());
  const currentPage = yield select(makeCurrentPageSelector());
  const offset = pageSize * currentPage;
  api.offset = offset;
  const requestURL = api.transactionsPath;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.error) return yield put(getGridDataErrorAction('error'));

    const totalCount = response.transactions[1];
    const transformGridData = response.transactions[0].map(({ ...gridData }) => ({
      amount_money:
        gridData.sender.user.id === userId
          ? `-${gridData.amountMoney
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
            .replace('.', ',')} ${gridData.currency.name}`
          : `${gridData.amountMoney
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
            .replace('.', ',')} ${gridData.currency.name}`,
      date_time: format(
        gridData.createdDate,
        `DD.MM.YYYY, ${locale === 'en' ? 'hh:MM A' : 'HH:MM'}`,
      ),
      transfer_title: gridData.transferTitle,
      sender_name: `${gridData.sender.user.name} ${
        gridData.sender.user.surname
      }`,
      account_bill:
      gridData.sender.user.id === userId
        ? gridData.recipient.accountBill
          .toString()
          .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
          .trim()
        : gridData.sender.accountBill
          .toString()
          .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
          .trim(),
      recipient_name: `${gridData.recipient.user.name} ${
        gridData.recipient.user.surname
      }`,
    }));

    yield put(getGridDataSuccessAction(totalCount, transformGridData));
  } catch (error) {
    yield put(getGridDataErrorAction(error));
  }
}

export default function* historyPageSaga() {
  yield takeLatest([GET_GRID_DATA, CHANGE_PAGE], handleGridData);
}
