/*
 *
 * HistoryPage actions
 *
 */

import {
  GRID_STATE_CHANGE,
  GET_GRID_DATA,
  GET_GRID_DATA_SUCCESS,
  GET_GRID_DATA_TRANSFORM_SUCCESS,
  GET_GRID_DATA_ERROR,
  CHANGE_PAGE,
} from './constants';

export function changePageAction() {
  return {
    type: CHANGE_PAGE,
  };
}

export function createGridAction(partialStateName, partialStateValue) {
  return {
    type: GRID_STATE_CHANGE,
    partialStateName,
    partialStateValue,
  };
}

export function getGridDataAction() {
  return {
    type: GET_GRID_DATA,
  };
}

export function getGridDataSuccessAction(totalCount) {
  return {
    type: GET_GRID_DATA_SUCCESS,
    totalCount,
  };
}

export function getGridDataErrorAction() {
  return {
    type: GET_GRID_DATA_ERROR,
  };
}

export function getGridDataTransformSuccessAction(rowsTransform) {
  return {
    type: GET_GRID_DATA_TRANSFORM_SUCCESS,
    rowsTransform,
  };
}
