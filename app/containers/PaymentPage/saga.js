import { select, call, put, takeLatest, throttle } from 'redux-saga/effects';
import api from 'api';
import request from 'utils/request';
import { makeTokenSelector } from 'containers/App/selectors';
import { SEARCH_ACCOUNT_BILLS } from './constants';
import { makeAccountNumberSelector } from './selectors';
import { searchAccountBillsSuccessAction } from './actions';

export function* searchAccountNumber() {
  const accountNumber = yield select(makeAccountNumberSelector());
  const token = yield select(makeTokenSelector());
  const requestURL = `${api.baseURL}${api.bills.searchPath}${accountNumber}`;

  if (accountNumber && accountNumber.length !== 26) {
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
        console.log(response);
      }
    } catch (error) {
      yield put(searchAccountBillsSuccessAction());
    }
  }
}

// Individual exports for testing
export default function* paymentPageSaga() {
  yield throttle(1000, SEARCH_ACCOUNT_BILLS, searchAccountNumber);
}
