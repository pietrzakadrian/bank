/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import { REGISTER_SUCCESSFUL } from 'containers/RegisterPage/constants';
import {
  CHANGE_ID,
  ENTER_ID,
  CHANGE_PASSWORD,
  ENTER_PASSWORD,
  ENTER_ID_SUCCESS,
  ENTER_ID_ERROR,
  EMPTY_ID_ERROR,
  ENTER_PASSWORD_SUCCESS,
  ENTER_PASSWORD_ERROR,
  EMPTY_PASSWORD_ERROR,
  LOGIN_FAILURE,
  LOGIN_STEP_BACK,
} from './constants';

export const initialState = fromJS({
  id: '',
  idError: '',
  password: '',
  passwordError: '',
  loginError: '',
  isIdExist: false,
  isLoading: false,
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ID:
      return state
        .set('id', action.id)
        .set('idError', '')
        .set('passwordError', '')
        .set('isIdExist', false);
    case ENTER_ID:
      return state.set('id', action.id).set('isLoading', true);
    case ENTER_ID_SUCCESS:
      return state.set('isIdExist', true).set('isLoading', false);
    case ENTER_ID_ERROR:
      return state
        .set('idError', action.error)
        .set('id', '')
        .set('isLoading', false);
    case CHANGE_PASSWORD:
      return state
        .set('password', action.password)
        .set('passwordError', '')
        .set('loginError', '');
    case ENTER_PASSWORD:
      return state.set('password', action.password).set('isLoading', true);
    case ENTER_PASSWORD_SUCCESS:
      return state.set('isIdExist', false).set('isLoading', false);
    case ENTER_PASSWORD_ERROR:
      return state
        .set('passwordError', action.error)
        .set('password', '')
        .set('isLoading', false);
    case EMPTY_ID_ERROR:
      return state.set('idError', action.error);
    case EMPTY_PASSWORD_ERROR:
      return state.set('passwordError', action.error);
    case REGISTER_SUCCESSFUL:
      return state
        .set('id', '')
        .set('idError', '')
        .set('password', '')
        .set('passwordError', '')
        .set('loginError', '')
        .set('isIdExist', false)
        .set('isLoading', false);

    case LOGIN_STEP_BACK:
      return state
        .set('isIdExist', false)
        .set('id', '')
        .set('password', '')
        .set('isLoading', false);
    case LOGIN_FAILURE:
      return state.set('loginError', action.error);
    default:
      return state;
  }
}

export default loginPageReducer;
