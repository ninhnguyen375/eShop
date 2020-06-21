import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import MODULE_REDUCERS from '../modules';
import commonReducer from './reducers/common';
import errorReducer from './reducers/appError';
import { persistKey } from '../configs';
import rootSaga from '../modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

const persistConfig = {
  key: persistKey,
  storage,
  blacklist: ['appError'],
};

const persistedReducer = persistCombineReducers(
  persistConfig, {
    common: commonReducer,
    appError: errorReducer,
    ...MODULE_REDUCERS,
  },
);

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const store = createStore(
  persistedReducer,
  bindMiddleware([sagaMiddleware, loggerMiddleware]),
);

store.sagaTask = sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
