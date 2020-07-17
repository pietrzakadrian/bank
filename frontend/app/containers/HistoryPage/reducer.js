/*
 *
 * HistoryPage reducer
 *
 */
import produce from 'immer';
import { LOGOUT_SUCCESS, LOGOUT_ERROR } from 'containers/App/constants';
import { MAKE_PAYMENT_SUCCESS } from 'containers/PaymentPage/constants';
import {
  GET_GRID_DATA_SUCCESS,
  GET_GRID_DATA_ERROR,
  CHANGE_PAGE,
} from './constants';

export const initialState = {
  gridData: [],
  pageSize: 12,
  currentPage: 0,
  totalCount: 0,
  error: '',
};

/* eslint-disable default-case, no-param-reassign */

const historyPageReducer = produce((draft, action) => {
  switch (action.type) {
    case MAKE_PAYMENT_SUCCESS:
      draft.gridData = [];
      break;
    case LOGOUT_SUCCESS:
      draft.gridData = [];
      draft.pageSize = 12;
      draft.currentPage = 0;
      draft.totalCount = 0;
      draft.error = '';
      break;
    case LOGOUT_ERROR:
      draft.gridData = [];
      draft.pageSize = 12;
      draft.currentPage = 0;
      draft.totalCount = 0;
      draft.error = '';
      break;
    case GET_GRID_DATA_SUCCESS:
      draft.gridData = action.gridData;
      draft.totalCount = action.totalCount;
      draft.error = '';
      break;
    case GET_GRID_DATA_ERROR:
      draft.error = action.error;
      break;
    case CHANGE_PAGE:
      draft.gridData = [];
      draft.currentPage = action.currentPage;
  }
}, initialState);

export default historyPageReducer;
