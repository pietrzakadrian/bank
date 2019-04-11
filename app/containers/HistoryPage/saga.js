import decode from 'jwt-decode';
import { push } from 'connected-react-router/immutable';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { GET_GRID_DATA } from './constants';
import {
  getGridDataSuccessAction,
  getGridDataTransformSuccessAction,
  getGridDataErrorAction,
} from './actions';
import makeSelectHistoryPage from './selectors';

function* getToken() {
  // Retrieves the user token from localStorage
  return localStorage.getItem('id_token');
}

function* getUserId() {
  return decode(yield call(getToken));
}

export function* getGridData() {
  const token = yield call(getUserId);
  const jwt = yield call(getToken);
  const requestURL = `/api/transactions/getTransactions`;
  const userId = token.id;
  const offset = makeSelectHistoryPage().currentPage;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        userId,
        offset: 0,
      }),
    });

    if (!response.error) {
      console.log('ok');
    } else {
      console.log('no ok');
    }
  } catch (err) {
    /* */
  }
}

// Individual exports for testing
export default function* historyPageSaga() {
  yield takeLatest(GET_GRID_DATA, getGridData);
}
