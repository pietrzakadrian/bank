import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { FormattedMessage } from 'react-intl';
import { push } from 'connected-react-router';
import request from 'utils/request';
import {
  makeIsLoggedSelector,
  makeUserIdSelector,
  makeTokenSelector,
} from 'containers/App/selectors';
import { enqueueSnackbarAction } from 'containers/App/actions';
import messages from './messages';
import {
  makeLoginSelector,
  makePasswordSelector,
  makeNameSelector,
  makeSurnameSelector,
  makeCurrencyIdSelector,
  makeEmailSelector,
  makeIsDataProcessingAgreementSelector,
} from './selectors';
import {
  stepNextAction,
  enterLoginErrorAction,
  enterLoginSuccessAction,
  enterPasswordErrorAction,
  enterPasswordSuccessAction,
  enterNameErrorAction,
  enterNameSuccessAction,
  enterSurnameErrorAction,
  enterSurnameSuccessAction,
  loadCurrencyErrorAction,
  loadCurrencySuccessAction,
  enterCurrencyErrorAction,
  enterCurrencySuccessAction,
  enterEmailErrorAction,
  enterEmailSuccessAction,
  errorDataProcessingAgreementAction,
  registerErrorAction,
  registerSuccessAction,
} from './actions';
import {
  ENTER_LOGIN,
  ENTER_PASSWORD,
  ENTER_NAME,
  ENTER_SURNAME,
  LOAD_CURRENCY,
  ENTER_CURRENCY,
  ENTER_EMAIL,
  IS_LOGGED,
} from './constants';
import api from '../../api';

export function* handleLogin() {
  const login = yield select(makeLoginSelector());
  const requestURL = `${api.baseURL}${api.users.isLoginPath}${login}`;
  const isNumber = /^\d+$/;
  const limit = 20;

  if (!login)
    return yield put(
      enterLoginErrorAction(<FormattedMessage {...messages.inputIDEmpty} />),
    );
  if (!isNumber.test(login) || login.length > limit)
    return yield put(
      enterLoginErrorAction(<FormattedMessage {...messages.invalidId} />),
    );

  try {
    const response = yield call(request, requestURL);

    if (response.isLogin)
      return yield put(
        enterLoginErrorAction(<FormattedMessage {...messages.inputIDExists} />),
      );

    yield put(enterLoginSuccessAction());
    yield put(stepNextAction());
  } catch (err) {
    yield put(
      enterLoginErrorAction(<FormattedMessage {...messages.errorServer} />),
    );
  }
}

export function* handlePassword() {
  const password = yield select(makePasswordSelector());
  const limit = 255;

  if (!password)
    return yield put(
      enterPasswordErrorAction(
        <FormattedMessage {...messages.errorPassword} />,
      ),
    );
  if (password.trim().length > limit)
    return yield put(
      enterPasswordErrorAction(
        <FormattedMessage {...messages.errorPasswordCorrect} />,
      ),
    );

  yield put(enterPasswordSuccessAction());
  yield put(stepNextAction());
}

export function* handleName() {
  const name = yield select(makeNameSelector());
  const isString = /^[a-zA-Z\u00C6\u00D0\u018E\u018F\u0190\u0194\u0132\u014A\u0152\u1E9E\u00DE\u01F7\u021C\u00E6\u00F0\u01DD\u0259\u025B\u0263\u0133\u014B\u0153\u0138\u017F\u00DF\u00FE\u01BF\u021D\u0104\u0181\u00C7\u0110\u018A\u0118\u0126\u012E\u0198\u0141\u00D8\u01A0\u015E\u0218\u0162\u021A\u0166\u0172\u01AFY\u0328\u01B3\u0105\u0253\u00E7\u0111\u0257\u0119\u0127\u012F\u0199\u0142\u00F8\u01A1\u015F\u0219\u0163\u021B\u0167\u0173\u01B0y\u0328\u01B4\u00C1\u00C0\u00C2\u00C4\u01CD\u0102\u0100\u00C3\u00C5\u01FA\u0104\u00C6\u01FC\u01E2\u0181\u0106\u010A\u0108\u010C\u00C7\u010E\u1E0C\u0110\u018A\u00D0\u00C9\u00C8\u0116\u00CA\u00CB\u011A\u0114\u0112\u0118\u1EB8\u018E\u018F\u0190\u0120\u011C\u01E6\u011E\u0122\u0194\u00E1\u00E0\u00E2\u00E4\u01CE\u0103\u0101\u00E3\u00E5\u01FB\u0105\u00E6\u01FD\u01E3\u0253\u0107\u010B\u0109\u010D\u00E7\u010F\u1E0D\u0111\u0257\u00F0\u00E9\u00E8\u0117\u00EA\u00EB\u011B\u0115\u0113\u0119\u1EB9\u01DD\u0259\u025B\u0121\u011D\u01E7\u011F\u0123\u0263\u0124\u1E24\u0126I\u00CD\u00CC\u0130\u00CE\u00CF\u01CF\u012C\u012A\u0128\u012E\u1ECA\u0132\u0134\u0136\u0198\u0139\u013B\u0141\u013D\u013F\u02BCN\u0143N\u0308\u0147\u00D1\u0145\u014A\u00D3\u00D2\u00D4\u00D6\u01D1\u014E\u014C\u00D5\u0150\u1ECC\u00D8\u01FE\u01A0\u0152\u0125\u1E25\u0127\u0131\u00ED\u00ECi\u00EE\u00EF\u01D0\u012D\u012B\u0129\u012F\u1ECB\u0133\u0135\u0137\u0199\u0138\u013A\u013C\u0142\u013E\u0140\u0149\u0144n\u0308\u0148\u00F1\u0146\u014B\u00F3\u00F2\u00F4\u00F6\u01D2\u014F\u014D\u00F5\u0151\u1ECD\u00F8\u01FF\u01A1\u0153\u0154\u0158\u0156\u015A\u015C\u0160\u015E\u0218\u1E62\u1E9E\u0164\u0162\u1E6C\u0166\u00DE\u00DA\u00D9\u00DB\u00DC\u01D3\u016C\u016A\u0168\u0170\u016E\u0172\u1EE4\u01AF\u1E82\u1E80\u0174\u1E84\u01F7\u00DD\u1EF2\u0176\u0178\u0232\u1EF8\u01B3\u0179\u017B\u017D\u1E92\u0155\u0159\u0157\u017F\u015B\u015D\u0161\u015F\u0219\u1E63\u00DF\u0165\u0163\u1E6D\u0167\u00FE\u00FA\u00F9\u00FB\u00FC\u01D4\u016D\u016B\u0169\u0171\u016F\u0173\u1EE5\u01B0\u1E83\u1E81\u0175\u1E85\u01BF\u00FD\u1EF3\u0177\u00FF\u0233\u1EF9\u01B4\u017A\u017C\u017E\u1E93]+$/;
  const limit = 255;

  if (!name)
    return yield put(
      enterNameErrorAction(<FormattedMessage {...messages.errorName} />),
    );
  if (name.trim().length > limit || !isString.test(name))
    return yield put(
      enterNameErrorAction(<FormattedMessage {...messages.errorNameCorrect} />),
    );

  yield put(enterNameSuccessAction());
  yield put(stepNextAction());
}

export function* handleSurname() {
  const surname = yield select(makeSurnameSelector());
  const isString = /^[a-zA-Z\u00C6\u00D0\u018E\u018F\u0190\u0194\u0132\u014A\u0152\u1E9E\u00DE\u01F7\u021C\u00E6\u00F0\u01DD\u0259\u025B\u0263\u0133\u014B\u0153\u0138\u017F\u00DF\u00FE\u01BF\u021D\u0104\u0181\u00C7\u0110\u018A\u0118\u0126\u012E\u0198\u0141\u00D8\u01A0\u015E\u0218\u0162\u021A\u0166\u0172\u01AFY\u0328\u01B3\u0105\u0253\u00E7\u0111\u0257\u0119\u0127\u012F\u0199\u0142\u00F8\u01A1\u015F\u0219\u0163\u021B\u0167\u0173\u01B0y\u0328\u01B4\u00C1\u00C0\u00C2\u00C4\u01CD\u0102\u0100\u00C3\u00C5\u01FA\u0104\u00C6\u01FC\u01E2\u0181\u0106\u010A\u0108\u010C\u00C7\u010E\u1E0C\u0110\u018A\u00D0\u00C9\u00C8\u0116\u00CA\u00CB\u011A\u0114\u0112\u0118\u1EB8\u018E\u018F\u0190\u0120\u011C\u01E6\u011E\u0122\u0194\u00E1\u00E0\u00E2\u00E4\u01CE\u0103\u0101\u00E3\u00E5\u01FB\u0105\u00E6\u01FD\u01E3\u0253\u0107\u010B\u0109\u010D\u00E7\u010F\u1E0D\u0111\u0257\u00F0\u00E9\u00E8\u0117\u00EA\u00EB\u011B\u0115\u0113\u0119\u1EB9\u01DD\u0259\u025B\u0121\u011D\u01E7\u011F\u0123\u0263\u0124\u1E24\u0126I\u00CD\u00CC\u0130\u00CE\u00CF\u01CF\u012C\u012A\u0128\u012E\u1ECA\u0132\u0134\u0136\u0198\u0139\u013B\u0141\u013D\u013F\u02BCN\u0143N\u0308\u0147\u00D1\u0145\u014A\u00D3\u00D2\u00D4\u00D6\u01D1\u014E\u014C\u00D5\u0150\u1ECC\u00D8\u01FE\u01A0\u0152\u0125\u1E25\u0127\u0131\u00ED\u00ECi\u00EE\u00EF\u01D0\u012D\u012B\u0129\u012F\u1ECB\u0133\u0135\u0137\u0199\u0138\u013A\u013C\u0142\u013E\u0140\u0149\u0144n\u0308\u0148\u00F1\u0146\u014B\u00F3\u00F2\u00F4\u00F6\u01D2\u014F\u014D\u00F5\u0151\u1ECD\u00F8\u01FF\u01A1\u0153\u0154\u0158\u0156\u015A\u015C\u0160\u015E\u0218\u1E62\u1E9E\u0164\u0162\u1E6C\u0166\u00DE\u00DA\u00D9\u00DB\u00DC\u01D3\u016C\u016A\u0168\u0170\u016E\u0172\u1EE4\u01AF\u1E82\u1E80\u0174\u1E84\u01F7\u00DD\u1EF2\u0176\u0178\u0232\u1EF8\u01B3\u0179\u017B\u017D\u1E92\u0155\u0159\u0157\u017F\u015B\u015D\u0161\u015F\u0219\u1E63\u00DF\u0165\u0163\u1E6D\u0167\u00FE\u00FA\u00F9\u00FB\u00FC\u01D4\u016D\u016B\u0169\u0171\u016F\u0173\u1EE5\u01B0\u1E83\u1E81\u0175\u1E85\u01BF\u00FD\u1EF3\u0177\u00FF\u0233\u1EF9\u01B4\u017A\u017C\u017E\u1E93]+$/;
  const limit = 255;

  if (!surname)
    return yield put(
      enterSurnameErrorAction(<FormattedMessage {...messages.errorSurname} />),
    );
  if (surname.length > limit || !isString.test(surname))
    return yield put(
      enterSurnameErrorAction(
        <FormattedMessage {...messages.errorSurnameCorrect} />,
      ),
    );

  yield put(enterSurnameSuccessAction());
  yield put(stepNextAction());
}

export function* loadCurrency() {
  const requestURL = `${api.baseURL}${api.currency.currencyPath}`;

  try {
    const response = yield call(request, requestURL);

    if (!response)
      return yield put(
        loadCurrencyErrorAction(<FormattedMessage {...messages.errorServer} />),
      );

    const currencyData = response.map(({ ...rest }) => [rest.id]);
    // eslint-disable-next-line prefer-spread
    const currencyArray = [].concat.apply([], currencyData);
    yield put(loadCurrencySuccessAction(currencyArray));
  } catch (err) {
    yield put(
      loadCurrencyErrorAction(<FormattedMessage {...messages.errorServer} />),
    );
  }
}

export function* handleCurrency() {
  const currencyId = yield select(makeCurrencyIdSelector());

  if (!currencyId)
    return yield put(
      enterCurrencyErrorAction(
        <FormattedMessage {...messages.entercurrency} />,
      ),
    );
  yield put(enterCurrencySuccessAction());
  yield put(stepNextAction());
}

export function* handleEmail() {
  const email = yield select(makeEmailSelector());
  const isDataProcessingAgreement = yield select(
    makeIsDataProcessingAgreementSelector(),
  );
  const requestURL = `${api.baseURL}${api.users.isEmailPath}${email}`;
  const isEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const limit = 255;

  if (!email && !isDataProcessingAgreement) {
    return (
      yield put(
        enterEmailErrorAction(
          <FormattedMessage {...messages.enterEmailEmpty} />,
        ),
      ),
      yield put(
        errorDataProcessingAgreementAction(
          <FormattedMessage {...messages.errorCheckbox} />,
        ),
      )
    );
  }
  if (!email)
    return yield put(
      enterEmailErrorAction(<FormattedMessage {...messages.enterEmailEmpty} />),
    );
  if (!isEmail.test(email) || email.length > limit)
    return yield put(
      enterEmailErrorAction(
        <FormattedMessage {...messages.errorIncorrectEmail} />,
      ),
    );
  if (!isDataProcessingAgreement)
    return yield put(
      errorDataProcessingAgreementAction(
        <FormattedMessage {...messages.errorCheckbox} />,
      ),
    );

  try {
    const response = yield call(request, requestURL);
    if (response.isEmail)
      return yield put(
        enterEmailErrorAction(
          <FormattedMessage {...messages.existAccountWithSameEmail} />,
        ),
      );

    yield put(enterEmailSuccessAction());
    yield call(registerAttempt);
  } catch (err) {
    yield put(
      enterEmailErrorAction(<FormattedMessage {...messages.errorServer} />),
    );
  }
}

function* registerAttempt() {
  const login = yield select(makeLoginSelector());
  const password = yield select(makePasswordSelector());
  const name = yield select(makeNameSelector());
  const surname = yield select(makeSurnameSelector());
  const currencyId = yield select(makeCurrencyIdSelector());
  const isDataProcessingAgreement = yield select(
    makeIsDataProcessingAgreementSelector(),
  );
  const email = yield select(makeEmailSelector());
  const requestURL = `${api.baseURL}${api.users.registerPath}`;

  if (
    !login ||
    !password ||
    !name ||
    !surname ||
    !currencyId ||
    !email ||
    !isDataProcessingAgreement
  )
    return yield put(registerErrorAction('error'));

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        password,
        name,
        surname,
        currencyId,
        email,
      }),
    });

    if (!response.success) return yield put(registerErrorAction('error'));

    yield put(registerSuccessAction());
    yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...messages.succesCreated} />,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
          autoHideDuration: 3000,
        },
      }),
    );
    yield put(push('/login'));
  } catch (err) {
    yield select(
      registerErrorAction(<FormattedMessage {...messages.errorServer} />),
    );
  }
}

export function* handleLogged() {
  const isLogged = yield select(makeIsLoggedSelector());
  const userId = yield select(makeUserIdSelector());
  const token = yield select(makeTokenSelector());

  if (isLogged && userId && token) yield put(push('/dashboard'));
}

export default function* registerPageSaga() {
  yield takeLatest(ENTER_LOGIN, handleLogin);
  yield takeLatest(ENTER_PASSWORD, handlePassword);
  yield takeLatest(ENTER_NAME, handleName);
  yield takeLatest(ENTER_SURNAME, handleSurname);
  yield takeLatest(LOAD_CURRENCY, loadCurrency);
  yield takeLatest(ENTER_CURRENCY, handleCurrency);
  yield takeLatest(ENTER_EMAIL, handleEmail);
  yield takeLatest(IS_LOGGED, handleLogged);
}
