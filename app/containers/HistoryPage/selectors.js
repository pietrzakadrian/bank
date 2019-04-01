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

const makeSelectHistoryPage = () =>
  createSelector(selectHistoryPageDomain, substate => substate.toJS());

export default makeSelectHistoryPage;
export { selectHistoryPageDomain };
