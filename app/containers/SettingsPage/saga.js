import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  makeTokenSelector,
  makeUserIdSelector,
} from 'containers/App/selectors';
import api from 'api';
import {
  makeNameSelector,
  makeSurnameSelector,
  makeEmailSelector,
  makeCurrencyIdSelector,
} from 'containers/DashboardPage/selectors';
import { LOAD_USER_DATA, LOAD_CURRENCY } from './constants';
import {
  loadUserDataSuccessAction,
  loadUserDataErrorAction,
  loadCurrencyErrorAction,
  loadCurrencySuccessAction,
} from './actions';

export function* handleUserData() {
  const token = yield select(makeTokenSelector());
  const userId = yield select(makeUserIdSelector());
  const name = yield select(makeNameSelector());
  const surname = yield select(makeSurnameSelector());
  const email = yield select(makeEmailSelector());
  const currencyId = yield select(makeCurrencyIdSelector());
  const requestUserData = `${api.baseURL}${api.users.userPath}${userId}`;
  const requestBillsData = `${api.baseURL}${api.bills.billsPath}${userId}`;

  if ((!name && !surname && !email) || !currencyId) {
    try {
      const responseUserData = yield call(request, requestUserData, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const responseBillsData = yield call(request, requestBillsData, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (responseUserData && responseBillsData) {
        const { name, surname, email } = responseUserData.user;
        const transformAccountingData = responseBillsData.map(
          ({ ...accountingData }) => ({
            currencyId: accountingData.currency.id,
          }),
        )[0];

        if (!name || !surname || !email || !transformAccountingData.currencyId)
          return yield put(loadUserDataErrorAction('error'));

        yield put(
          loadUserDataSuccessAction(
            name,
            surname,
            email,
            transformAccountingData.currencyId,
          ),
        );
      }
    } catch (error) {
      yield put(loadUserDataErrorAction(error));
    }
  } else yield put(loadUserDataSuccessAction(name, surname, email, currencyId));
}

export function* handleCurrency() {
  const token = yield select(makeTokenSelector());
  const requestURL = `${api.baseURL}${api.currency.currencyPath}`;

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
      const transformCurrency = response.map(item => item.id);
      yield put(loadCurrencySuccessAction(transformCurrency));
    }
  } catch (error) {
    yield put(loadCurrencyErrorAction(error));
  }
}

// Individual exports for testing
export default function* settingsPageSaga() {
  yield takeLatest(LOAD_USER_DATA, handleUserData);
  yield takeLatest(LOAD_CURRENCY, handleCurrency);
}
