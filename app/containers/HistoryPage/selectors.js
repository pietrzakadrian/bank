import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the historyPage state domain
 */

const selectHistoryPageDomain = state => state.historyPage || initialState;

/**
 * Other specific selectors
 */

const makeGridDataSelector = () =>
  createSelector(
    selectHistoryPageDomain,
    substate => substate.gridData,
  );

const makeErrorSelector = () =>
  createSelector(
    selectHistoryPageDomain,
    substate => substate.error,
  );

const makePageSizeSelector = () =>
  createSelector(
    selectHistoryPageDomain,
    substate => substate.pageSize,
  );

const makeCurrentPageSelector = () =>
  createSelector(
    selectHistoryPageDomain,
    substate => substate.currentPage,
  );

const makeTotalCountSelector = () =>
  createSelector(
    selectHistoryPageDomain,
    substate => substate.totalCount,
  );

/**
 * Default selector used by HistoryPage
 */

const makeSelectHistoryPage = () =>
  createSelector(
    selectHistoryPageDomain,
    substate => substate,
  );

export default makeSelectHistoryPage;
export {
  makeGridDataSelector,
  makeErrorSelector,
  makePageSizeSelector,
  makeCurrentPageSelector,
  makeTotalCountSelector,
};
