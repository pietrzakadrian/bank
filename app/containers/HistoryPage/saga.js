import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  makeUserIdSelector,
  makeTokenSelector,
} from 'containers/App/selectors';
import { format } from 'date-fns';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { GET_GRID_DATA, CHANGE_PAGE } from './constants';
import api from '../../api';
import { getGridDataErrorAction, getGridDataSuccessAction } from './actions';
import { makePageSizeSelector, makeCurrentPageSelector } from './selectors';

export function* handleGridData() {
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());
  const locale = yield select(makeSelectLocale());
  const pageSize = yield select(makePageSizeSelector());
  const currentPage = yield select(makeCurrentPageSelector());
  const requestURL = `${api.baseURL}${api.transactions.getTransactionsPath}`;
  const offset = pageSize * currentPage;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        offset,
      }),
    });

    if (response.error) return yield put(getGridDataErrorAction('error'));

    const totalCount = response.count;
    const transformGridData = response.rows.map(({ ...gridData }) => ({
      amount_money:
        gridData.id_sender === userId
          ? `-${gridData.amount_money
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
            .replace('.', ',')} ${gridData.currency.currency}`
          : `${gridData.amount_money
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
            .replace('.', ',')} ${gridData.currency.currency}`,
      date_time: format(
        gridData.date_time,
        `DD.MM.YYYY, ${locale === 'en' ? 'hh:MM A' : 'HH:MM'}`,
      ),
      transfer_title: gridData.transfer_title,
      sender_name: `${gridData.getSenderdata.name} ${gridData.getSenderdata.surname}`,
      account_bill:
        gridData.id_sender === userId
          ? gridData.getRecipientdata.bills[0].account_bill
            .toString()
            .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
            .trim()
          : gridData.getSenderdata.bills[0].account_bill
            .toString()
            .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
            .trim(),
      recipient_name: `${gridData.getRecipientdata.name} ${gridData.getRecipientdata.surname}`,
    }));

    yield put(getGridDataSuccessAction(totalCount, transformGridData));
  } catch (error) {
    yield put(getGridDataErrorAction(error));
  }
}

export default function* historyPageSaga() {
  yield takeLatest([GET_GRID_DATA, CHANGE_PAGE], handleGridData);
}
