import { put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import decode from 'jwt-decode';

// Import Selectors
import {
  makeIsLoggedSelector,
  makeUserIdSelector,
  makeTokenSelector,
} from 'containers/App/selectors';

// Import Constants
import { IS_LOGGED } from './constants';

export function* handleLogged() {
  const isLogged = yield select(makeIsLoggedSelector());
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());

  if (
    isLogged &&
    userId &&
    token &&
    decode(token).exp > new Date().getTime() / 1000
  ) {
    return yield put(push('/dashboard'));
  }

  return yield put(push('/login'));
}

export default function* homePageSaga() {
  yield takeLatest(IS_LOGGED, handleLogged);
}
