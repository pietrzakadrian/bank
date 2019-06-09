import { put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { IS_LOGGED } from 'containers/App/constants';
import {
  makeIsLoggedSelector,
  makeUserIdSelector,
  makeTokenSelector,
} from 'containers/App/selectors';

export function* handleLogged() {
  const isLogged = yield select(makeIsLoggedSelector());
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());

  if (isLogged && userId && token) yield put(push('/dashboard'));
}

// Individual exports for testing
export default function* registerPageSaga() {
  yield takeLatest(IS_LOGGED, handleLogged);
}
