/*
 *
 * HistoryPage actions
 *
 */

import { GRID_STATE_CHANGE_ACTION } from './constants';

export function createGridAction(partialStateName, partialStateValue) {
  return {
    type: GRID_STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
  };
}
