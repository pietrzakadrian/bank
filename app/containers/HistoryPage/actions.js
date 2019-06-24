/*
 *
 * HistoryPage actions
 *
 */

import {
  GET_GRID_DATA,
  GET_GRID_DATA_SUCCESS,
  GET_GRID_DATA_ERROR,
  CHANGE_PAGE,
  TOGGLE_ROW_DETAIL,
} from './constants';

export function changePageAction(currentPage) {
  return {
    type: CHANGE_PAGE,
    currentPage,
  };
}

export function toggleRowDetailAction() {
  return {
    type: TOGGLE_ROW_DETAIL,
  };
}

export function getGridDataAction() {
  return {
    type: GET_GRID_DATA,
  };
}

export function getGridDataSuccessAction(totalCount, gridData) {
  return {
    type: GET_GRID_DATA_SUCCESS,
    totalCount,
    gridData,
  };
}

export function getGridDataErrorAction(error) {
  return {
    type: GET_GRID_DATA_ERROR,
    error,
  };
}
