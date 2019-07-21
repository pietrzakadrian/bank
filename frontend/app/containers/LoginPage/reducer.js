/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  CHANGE_LOGIN,
  ENTER_LOGIN,
  ENTER_LOGIN_SUCCESS,
  ENTER_LOGIN_ERROR,
  CHANGE_PASSWORD,
  ENTER_PASSWORD,
  ENTER_PASSWORD_SUCCESS,
  ENTER_PASSWORD_ERROR,
  STEP_NEXT,
  STEP_BACK,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

export const initialState = {
  login: '',
  password: '',
  error: '',
  activeStep: 0,
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_LOGIN:
      draft.login = action.login;
      draft.error = '';
      break;
    case ENTER_LOGIN:
      draft.isLoading = true;
      break;
    case ENTER_LOGIN_SUCCESS:
      draft.isLoading = false;
      break;
    case ENTER_LOGIN_ERROR:
      draft.error = action.error;
      draft.isLoading = false;
      break;
    case CHANGE_PASSWORD:
      draft.password = action.password;
      draft.error = '';
      break;
    case ENTER_PASSWORD:
      draft.isLoading = true;
      break;
    case ENTER_PASSWORD_SUCCESS:
      draft.isLoading = false;
      break;
    case ENTER_PASSWORD_ERROR:
      draft.error = action.error;
      draft.isLoading = false;
      break;
    case LOGIN:
      draft.login = action.login;
      draft.password = action.password;
      draft.isLoading = true;
      break;
    case LOGIN_SUCCESS:
      draft.isLoading = false;
      break;
    case LOGIN_ERROR:
      draft.error = action.error;
      draft.isLoading = false;
      break;
    case STEP_NEXT:
      draft.activeStep += 1;
      draft.error = '';
      break;
    case STEP_BACK:
      draft.activeStep -= 1;
      draft.error = '';
      break;
    case LOCATION_CHANGE:
      draft.login = '';
      draft.password = '';
      draft.error = '';
      draft.activeStep = 0;
      draft.isLoading = false;
      break;
  }
}, initialState);

export default loginPageReducer;
