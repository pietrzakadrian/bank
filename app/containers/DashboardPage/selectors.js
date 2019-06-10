import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboardPage state domain
 */

const selectDashboardPageDomain = state => state.dashboardPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DashboardPage
 */

const makeSelectDashboardPage = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate,
  );

export default makeSelectDashboardPage;
export { selectDashboardPageDomain };
