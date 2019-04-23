import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRouter = state => state.get('router');

const makeUserIdSelector = () =>
  createSelector(selectGlobal, globalState => globalState.get('userId'));

const makeIsLoggedSelector = () =>
  createSelector(selectGlobal, globalState => globalState.get('isLogged'));

const makeIsNewNotificationSelector = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('isNewNotification'),
  );

const makeNotificationCountSelector = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('notificationCount'),
  );

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

const makeNotificationsSelector = () =>
  createSelector(selectGlobal, globalState => globalState.get('notifications'));

export {
  makeSelectLocation,
  makeUserIdSelector,
  makeIsLoggedSelector,
  makeIsNewNotificationSelector,
  makeNotificationCountSelector,
  makeNotificationsSelector,
};
