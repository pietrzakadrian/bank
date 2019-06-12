/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import localForage from 'localforage';
import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import globalReducer from 'containers/App/reducer';

const persistConfig = {
  key: 'bank',
  storage: localForage,
  debug: true,
};

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: persistReducer(persistConfig, globalReducer),
    language: persistReducer(persistConfig, languageProviderReducer),
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
