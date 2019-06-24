/*
 *
 * HistoryPage reducer
 *
 */
import produce from 'immer';
import {
  GET_GRID_DATA,
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
const historyPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
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
  });

export default historyPageReducer;
