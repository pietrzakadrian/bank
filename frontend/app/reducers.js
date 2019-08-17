/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import globalReducer from 'containers/App/reducer';

const globalPersistConfig = {
  key: 'bankapp_global',
  storage,
  blacklist: [
    'isOpenNotifications',
    'messages',
    'messageCount',
    'notifications',
    'notificationCount',
    'snackbars',
    'error',
    'isOpenNotifications',
    'isOpenMessages',
    'isNewNotifications',
    'isNewMessages',
    'isLogged',
    'isOpenMossageModal',
  ],
};

const languagePersistConfig = {
  key: 'bankapp_language',
  storage,
};

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: persistReducer(globalPersistConfig, globalReducer),
    language: persistReducer(languagePersistConfig, languageProviderReducer),
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
