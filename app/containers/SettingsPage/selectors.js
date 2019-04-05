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

const makeNewPasswordSelector = () =>
  createSelector(selectSettingsPageDomain, substate =>
    substate.get('newPassword'),
  );

const makeNewNameSelector = () =>
  createSelector(selectSettingsPageDomain, substate => substate.get('newName'));

const makeNewSurnameSelector = () =>
  createSelector(selectSettingsPageDomain, substate =>
    substate.get('newSurname'),
  );

const makeNewEmailSelector = () =>
  createSelector(selectSettingsPageDomain, substate =>
    substate.get('newEmail'),
  );

const makeErrorNameSelector = () =>
  createSelector(selectSettingsPageDomain, substate =>
    substate.get('errorName'),
  );

const makeErrorSurnameSelector = () =>
  createSelector(selectSettingsPageDomain, substate =>
    substate.get('errorSurname'),
  );

const makeErrorEmailSelector = () =>
  createSelector(selectSettingsPageDomain, substate =>
    substate.get('errorEmail'),
  );

const makeErrorPasswordSelector = () =>
  createSelector(selectSettingsPageDomain, substate =>
    substate.get('errorPassword'),
  );

const makeMessageSelector = () =>
  createSelector(selectSettingsPageDomain, substate => substate.get('message'));

const makeSelectSettingsPage = () =>
  createSelector(selectSettingsPageDomain, substate => substate.toJS());

export default makeSelectSettingsPage;
export {
  selectSettingsPageDomain,
  makeNewPasswordSelector,
  makeNewNameSelector,
  makeNewSurnameSelector,
  makeNewEmailSelector,
  makeErrorNameSelector,
  makeErrorSurnameSelector,
  makeErrorEmailSelector,
  makeErrorPasswordSelector,
  makeMessageSelector,
};
