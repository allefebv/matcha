import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist'
import LocalStorage from 'redux-persist/lib/storage'
import { rootReducer } from './rootReducer';
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: 'root',
  storage: LocalStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  composeWithDevTools()
);

export const persistor = persistStore(store)