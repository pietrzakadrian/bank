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

const makeCurrentPageSelector = () =>
  createSelector(selectHistoryPageDomain, substate =>
    substate.get('currentPage'),
  );

const makePageSizeSelector = () =>
  createSelector(selectHistoryPageDomain, substate => substate.get('pageSize'));

const makeTotalPagesSelector = () =>
  createSelector(selectHistoryPageDomain, substate =>
    substate.get('totalPages'),
  );

const makeTotalCountSelector = () =>
  createSelector(selectHistoryPageDomain, substate =>
    substate.get('totalCount'),
  );

const makeSelectHistoryPage = () =>
  createSelector(selectHistoryPageDomain, substate => substate.toJS());

export default makeSelectHistoryPage;
export {
  selectHistoryPageDomain,
  makePageSizeSelector,
  makeCurrentPageSelector,
  makeRowsSelector,
  makeTotalPagesSelector,
  makeTotalCountSelector,
};
