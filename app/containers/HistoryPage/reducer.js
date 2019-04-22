/*
 *
 * HistoryPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GRID_STATE_CHANGE,
  GET_GRID_DATA_SUCCESS,
  GET_GRID_DATA_TRANSFORM_SUCCESS,
  CHANGE_PAGE,
} from './constants';

export const initialState = fromJS({
  rowsTransform: null,
  currentPage: 0,
  pageSize: 12,
  totalCount: null,
  percentColumns: ['amount_money'],
});

function historyPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GRID_DATA_TRANSFORM_SUCCESS:
      return state.set('rowsTransform', action.rowsTransform);
    case GET_GRID_DATA_SUCCESS:
      return state.set('totalCount', action.totalCount);
    case CHANGE_PAGE:
      return state.set('rowsTransform', null);
    case GRID_STATE_CHANGE:
      return state.set(action.partialStateName, action.partialStateValue);
    default:
      return state;
  }
}

export default historyPageReducer;
