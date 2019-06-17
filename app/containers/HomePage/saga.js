import { put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import decode from 'jwt-decode';
import {
  makeIsLoggedSelector,
  makeUserIdSelector,
  makeTokenSelector,
} from 'containers/App/selectors';
import { logoutSuccessAction } from 'containers/App/actions';
import { IS_LOGGED } from './constants';

export function* handleLogged() {
  const isLogged = yield select(makeIsLoggedSelector());
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());

  if (token && decode(token).exp < new Date().getTime() / 1000)
    yield put(logoutSuccessAction());

  if (isLogged && userId && token) return yield put(push('/dashboard'));

  yield put(push('/login'));
}

export default function* homePageSaga() {
  yield takeLatest(IS_LOGGED, handleLogged);
}
