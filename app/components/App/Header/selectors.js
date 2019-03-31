import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the headerApp state domain
 */

const selectHeaderDomain = state => state.get('header', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HeaderApp
 */

const makeIsDesktopOpenSelector = () =>
  createSelector(selectHeaderDomain, substate => substate.get('isDesktopOpen'));

const makeIsMobileOpenSelector = () =>
  createSelector(selectHeaderDomain, substate => substate.get('isMobileOpen'));

const makeSelectHeader = () =>
  createSelector(selectHeaderDomain, substate => substate.toJS());

export default makeSelectHeader;
export { makeIsDesktopOpenSelector, makeIsMobileOpenSelector };
