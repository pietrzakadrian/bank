import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

// Import Services
import AuthService from 'services/auth.service';

// Import Constants
import { IS_LOGGED } from './constants';

export function* handleLogged() {
  const auth = new AuthService();
  const isLogged = auth.loggedIn();

  if (isLogged) {
    return yield put(push('/dashboard'));
  }

  return yield put(push('/login'));
}

export default function* homePageSaga() {
  yield takeLatest(IS_LOGGED, handleLogged);
}
