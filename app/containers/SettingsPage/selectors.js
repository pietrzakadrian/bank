import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settingsPage state domain
 */

const selectSettingsPageDomain = state =>
  state.get('settingsPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SettingsPage
 */

const makeSelectSettingsPage = () =>
  createSelector(selectSettingsPageDomain, substate => substate.toJS());

export default makeSelectSettingsPage;
export { selectSettingsPageDomain };
