import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the historyPage state domain
 */

const selectHistoryPageDomain = state => state.get('historyPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HistoryPage
 */

const makeRowsSelector = () =>
  createSelector(selectHistoryPageDomain, substate => substate.get('rows'));

const makeSortingSelector = () =>
  createSelector(selectHistoryPageDomain, substate => substate.get('sorting'));

const makeGroupingSelector = () =>
  createSelector(selectHistoryPageDomain, substate => substate.get('grouping'));

const makeExpandedGroupsSelector = () =>
  createSelector(selectHistoryPageDomain, substate =>
    substate.get('expandedGroups'),
  );

const makeSelectionSelector = () =>
  createSelector(selectHistoryPageDomain, substate =>
    substate.get('selection'),
  );

const makeExpandedRowIdsSelector = () =>
  createSelector(selectHistoryPageDomain, substate =>
    substate.get('expandedRowIds'),
  );

const makeFiltersSelector = () =>
  createSelector(selectHistoryPageDomain, substate => substate.get('filters'));

const makeCurrentPageSelector = () =>
  createSelector(selectHistoryPageDomain, substate =>
    substate.get('currentPage'),
  );

const makePageSizeSelector = () =>
  createSelector(selectHistoryPageDomain, substate => substate.get('pageSize'));

const makePageSizesSelector = () =>
  createSelector(selectHistoryPageDomain, substate =>
    substate.get('pageSizes'),
  );

const makeColumnOrderSelector = () =>
  createSelector(selectHistoryPageDomain, substate =>
    substate.get('columnOrder'),
  );

const makeColumnWidthsSelector = () =>
  createSelector(selectHistoryPageDomain, substate =>
    substate.get('columnWidths'),
  );

const makeSelectHistoryPage = () =>
  createSelector(selectHistoryPageDomain, substate => substate.toJS());

export default makeSelectHistoryPage;
export {
  selectHistoryPageDomain,
  makeColumnWidthsSelector,
  makeColumnOrderSelector,
  makePageSizesSelector,
  makePageSizeSelector,
  makeCurrentPageSelector,
  makeFiltersSelector,
  makeExpandedRowIdsSelector,
  makeSelectionSelector,
  makeExpandedGroupsSelector,
  makeGroupingSelector,
  makeSortingSelector,
  makeRowsSelector,
};
