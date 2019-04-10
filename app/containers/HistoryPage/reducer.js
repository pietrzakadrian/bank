/*
 *
 * HistoryPage reducer
 *
 */

import { fromJS } from 'immutable';
import { GRID_STATE_CHANGE_ACTION } from './constants';
import {
  generateRows,
  employeeValues,
  employeeTaskValues,
} from './demo-data/generator';

export const initialState = fromJS({
  rows: generateRows({
    columnValues: {
      ...employeeValues,
      tasks: ({ random }) =>
        generateRows({
          columnValues: employeeTaskValues,
          length: Math.floor(random() * 3) + 4,
          random,
        }),
    },
    length: 3,
  }),
  sorting: [],
  grouping: [],
  expandedGroups: [],
  selection: [],
  expandedRowIds: [1],
  filters: [],
  currentPage: 0,
  pageSize: 12,
  pageSizes: [5, 10, 15],
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
    case GRID_STATE_CHANGE_ACTION:
      return state.set(action.partialStateName, action.partialStateValue);
    default:
      return state;
  }
}

export default historyPageReducer;
