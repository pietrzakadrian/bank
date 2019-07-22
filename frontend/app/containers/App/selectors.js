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
    globalState => globalState.notifications,
  );

const makeSnackbarsSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.snackbars,
  );

const makeMessagesSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.messages,
  );

const makeErrorSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeIsOpenNavigationMobileSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isOpenNavigationMobile,
  );

const makeIsOpenNavigationDesktopSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isOpenNavigationDesktop,
  );

const makeIsOpenNotificationsSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isOpenNotifications,
  );

const makeIsOpenMessagesSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isOpenMessages,
  );

const makeIsNewMessagesSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isNewMessages,
  );

const makeIsNewNotificationsSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isNewNotifications,
  );

const makeNotificationCountSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.notificationCount,
  );

const makeMessageCountSelector = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.messageCount,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export {
  makeUserIdSelector,
  makeTokenSelector,
  makeSelectLocation,
  makeNotificationsSelector,
  makeMessagesSelector,
  makeSnackbarsSelector,
  makeErrorSelector,
  makeIsOpenNavigationMobileSelector,
  makeIsOpenNavigationDesktopSelector,
  makeIsOpenNotificationsSelector,
  makeIsOpenMessagesSelector,
  makeIsNewMessagesSelector,
  makeIsNewNotificationsSelector,
  makeNotificationCountSelector,
  makeMessageCountSelector,
};
