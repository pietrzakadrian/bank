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

/**
 * Change table page, this action starts the request saga
 * @param  {number} currentPage The current page
 *
 * @return {object} An action object with a type of CHANGE_PAGE
 */
export function changePageAction(currentPage) {
  return {
    type: CHANGE_PAGE,
    currentPage,
  };
}

/**
 * Open additional data from payment
 *
 * @return {object} An action object with a type of TOGGLE_ROW_DETAIL
 */
export function toggleRowDetailAction() {
  return {
    type: TOGGLE_ROW_DETAIL,
  };
}

/**
 * Get payments data, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_GRID_DATA
 */
export function getGridDataAction() {
  return {
    type: GET_GRID_DATA,
  };
}

/**
 * Dispatched when the grid data are loaded by the request saga
 *
 * @param  {number} totalCount The total count
 * @param  {array} gridData The grid data
 *
 * @return {object} An action object with a type of GET_GRID_DATA_SUCCESS passing the repos
 */
export function getGridDataSuccessAction(totalCount, gridData) {
  return {
    type: GET_GRID_DATA_SUCCESS,
    totalCount,
    gridData,
  };
}

/**
 * Dispatched when loading the grid data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_GRID_DATA_ERROR passing the repos
 */
export function getGridDataErrorAction(error) {
  return {
    type: GET_GRID_DATA_ERROR,
    error,
  };
}
