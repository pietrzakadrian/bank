import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeIsLoggedSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isLogged,
  );

const makeUserIdSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userId,
  );

const makeTokenSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.token,
  );

const makeNotificationsSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.token,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export {
  makeIsLoggedSelector,
  makeUserIdSelector,
  makeTokenSelector,
  makeSelectLocation,
  makeNotificationsSelector,
};
