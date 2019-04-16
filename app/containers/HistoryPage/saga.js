import decode from 'jwt-decode';
import { push } from 'connected-react-router/immutable';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import moment from 'moment';

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
  // const offset = makeSelectHistoryPage().currentPage;

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
        offset: 0, // todo: change
      }),
    });

    if (!response.error) {
      yield put(getGridDataSuccessAction());
      const output = response.rows.map(
        ({ getSenderdata, getRecipientdata, ...rest }) => ({
          ...rest,
          date_time: moment(rest.date_time).format('DD.MM.YYYY, HH:mm'),
          amount_money:
            rest.id_sender === userId
              ? `-${rest.amount_money.toFixed(2)} ${rest.currency.currency}`
              : `${rest.amount_money.toFixed(2)} ${rest.currency.currency}`,
          sender_name: `${getSenderdata.name} ${getSenderdata.surname}`,
          recipient_name: `${getRecipientdata.name} ${
            getRecipientdata.surname
          }`,
        }),
      );

      const finalOutupt = { rows: [...output] };

      yield put(getGridDataTransformSuccessAction(finalOutupt.rows));
    } else {
      yield put(getGridDataErrorAction('error'));
    }
  } catch (err) {
    /* */
  }
}

// Individual exports for testing
export default function* historyPageSaga() {
  yield takeLatest(GET_GRID_DATA, getGridData);
}
