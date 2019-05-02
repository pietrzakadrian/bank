/*
 *
 * RegisterPage reducer
 *
 */

import { fromJS } from 'immutable';
import { LOGOUT_SUCCESS } from 'components/App/Header/constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  CHANGE_ID,
  ENTER_ID,
  ENTER_ID_SUCCESS,
  ENTER_ID_ERROR,
  EMPTY_ID_ERROR,
  CHANGE_PASSWORD,
  ENTER_PASSWORD,
  ENTER_PASSWORD_SUCCESS,
  ENTER_PASSWORD_ERROR,
  EMPTY_PASSWORD_ERROR,
  CHANGE_NAME,
  ENTER_NAME,
  ENTER_NAME_SUCCESS,
  ENTER_NAME_ERROR,
  EMPTY_NAME_ERROR,
  CHANGE_SURNAME,
  ENTER_SURNAME,
  ENTER_SURNAME_SUCCESS,
  ENTER_SURNAME_ERROR,
  EMPTY_SURNAME_ERROR,
  LOAD_CURRENCY,
  LOAD_CURRENCY_SUCCESS,
  LOAD_CURRENCY_ERROR,
  CHANGE_CURRENCY,
  ENTER_CURRENCY,
  CHANGE_EMAIL,
  ENTER_EMAIL,
  ENTER_EMAIL_SUCCESS,
  ENTER_EMAIL_ERROR,
  EMPTY_EMAIL_ERROR,
  TOGGLE_DATA_PROCESSING_AGREEMENT,
  DATA_PROCESSING_AGREEMENT_ERROR,
  REGISTER_SUCCESSFUL,
  REGISTER_FAILURE,
  REGISTER_STEP_NEXT,
  REGISTER_STEP_BACK,
} from './constants';

export const initialState = fromJS({
  id: '',
  password: '',
  name: '',
  surname: '',
  email: '',
  currency: null,
  currencyId: null,
  isDataProcessingAgreement: false,
  errorDataProcessingAgreement: '',
  error: '',
  activeStep: 0,
  isLoading: false,
});

function registerPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state
        .set('activeStep', 0)
        .set('id', '')
        .set('password', '')
        .set('name', '')
        .set('surname', '')
        .set('email', '')
        .set('error', '')
        .set('isDataProcessingAgreement', false)
        .set('errorDataProcessingAgreement', '')
        .set('isLoading', false);
    case LOGOUT_SUCCESS:
      return state
        .set('activeStep', 0)
        .set('id', '')
        .set('password', '')
        .set('name', '')
        .set('surname', '')
        .set('email', '')
        .set('error', '')
        .set('isDataProcessingAgreement', false)
        .set('currency', null)
        .set('errorDataProcessingAgreement', '')
        .set('isLoading', false);
    case CHANGE_ID:
      return state.set('id', action.id).set('error', '');
    case ENTER_ID:
      return state.set('id', action.id).set('isLoading', true);
    case ENTER_ID_SUCCESS:
      return state.set('error', '').set('isLoading', false);
    case ENTER_ID_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case EMPTY_ID_ERROR:
      return state.set('error', action.error);
    case CHANGE_PASSWORD:
      return state.set('password', action.password).set('error', '');
    case ENTER_PASSWORD:
      return state.set('password', action.password).set('isLoading', true);
    case ENTER_PASSWORD_SUCCESS:
      return state.set('error', '').set('isLoading', false);
    case ENTER_PASSWORD_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case EMPTY_PASSWORD_ERROR:
      return state.set('error', action.error);
    case CHANGE_NAME:
      return state.set('name', action.name).set('error', '');
    case ENTER_NAME:
      return state.set('name', action.name).set('isLoading', true);
    case ENTER_NAME_SUCCESS:
      return state.set('error', '').set('isLoading', false);
    case ENTER_NAME_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case EMPTY_NAME_ERROR:
      return state.set('error', action.error);
    case CHANGE_SURNAME:
      return state.set('surname', action.surname).set('error', '');
    case ENTER_SURNAME:
      return state.set('surname', action.surname).set('isLoading', true);
    case ENTER_SURNAME_SUCCESS:
      return state.set('error', '').set('isLoading', false);
    case ENTER_SURNAME_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case EMPTY_SURNAME_ERROR:
      return state.set('error', action.error);
    case LOAD_CURRENCY:
      return state;
    case LOAD_CURRENCY_SUCCESS:
      return state
        .set('currency', action.currency)
        .set('currencyId', action.currency[0]);
    case LOAD_CURRENCY_ERROR:
      return state.set('error', action.error);
    case CHANGE_CURRENCY:
      return state.set('currencyId', action.currencyId);
    case ENTER_CURRENCY:
      return state.set('currencyId', action.currencyId);
    case CHANGE_EMAIL:
      return state.set('email', action.email).set('error', '');
    case ENTER_EMAIL:
      return state.set('email', action.email).set('isLoading', true);
    case ENTER_EMAIL_SUCCESS:
      return state.set('error', '').set('isLoading', false);
    case ENTER_EMAIL_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case EMPTY_EMAIL_ERROR:
      return state.set('error', action.error);
    case TOGGLE_DATA_PROCESSING_AGREEMENT:
      return state
        .set(
          'isDataProcessingAgreement',
          !state.get('isDataProcessingAgreement'),
        )
        .set('errorDataProcessingAgreement', '');
    case DATA_PROCESSING_AGREEMENT_ERROR:
      return state.set('errorDataProcessingAgreement', action.error);
    case REGISTER_SUCCESSFUL:
      return state
        .set('activeStep', 0)
        .set('id', '')
        .set('password', '')
        .set('name', '')
        .set('surname', '')
        .set('email', '')
        .set('error', '')
        .set('isDataProcessingAgreement', false)
        .set('currency', null)
        .set('errorDataProcessingAgreement', '')
        .set('isLoading', false);

    case REGISTER_FAILURE:
      return state.set('error', action.error);
    case REGISTER_STEP_NEXT:
      return state.set('activeStep', state.get('activeStep') + 1);
    case REGISTER_STEP_BACK: {
      if (state.get('activeStep') === 1) {
        return state
          .set('activeStep', state.get('activeStep') - 1)
          .set('id', '')
          .set('error', '');
      }
      if (state.get('activeStep') === 2) {
        return state
          .set('activeStep', state.get('activeStep') - 1)
          .set('password', '')
          .set('error', '');
      }
      if (state.get('activeStep') === 3) {
        return state
          .set('activeStep', state.get('activeStep') - 1)
          .set('name', '')
          .set('error', '');
      }
      if (state.get('activeStep') === 4) {
        return state
          .set('activeStep', state.get('activeStep') - 1)
          .set('surname', '')
          .set('error', '');
      }
      if (state.get('activeStep') === 5) {
        return state
          .set('activeStep', state.get('activeStep') - 1)
          .set('error', '');
      }
      if (state.get('activeStep') === 6) {
        return state
          .set('activeStep', state.get('activeStep') - 1)
          .set('email', '')
          .set('error', '')
          .set('isDataProcessingAgreement', false);
      }
      return state.set('activeStep', state.get('activeStep') - 1);
    }
    default:
      return state;
  }
}

export default registerPageReducer;
