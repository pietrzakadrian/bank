/*
 *
 * HistoryPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GRID_STATE_CHANGE,
  GET_GRID_DATA,
  GET_GRID_DATA_SUCCESS,
  GET_GRID_DATA_TRANSFORM_SUCCESS,
  GET_GRID_DATA_ERROR,
} from './constants';
import { generateRows, mock } from './demo-data/generator';

export const initialState = fromJS({
  rows: generateRows({
    length: mock.count,
  }),
  rowsTransform: null,
  rows2: mock.result,
  sorting: [],
  grouping: [],
  expandedGroups: [],
  selection: [],
  expandedRowIds: [1],
  filters: [],
  currentPage: 0,
  pageSize: 12,
  percentColumns: ['amount_money'],
  columnOrder: [
    'date',
    'firstName',
    'lastName',
    'birthDate',
    'position',
    'state',
  ],
  hiddenColumnNames: [],
});

function historyPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GRID_DATA_TRANSFORM_SUCCESS:
      return state.set('rowsTransform', action.rowsTransform);
    case GRID_STATE_CHANGE:
      return state.set(action.partialStateName, action.partialStateValue);
    default:
      return state;
  }
}

export default historyPageReducer;
