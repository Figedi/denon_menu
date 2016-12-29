// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localforage';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const router = routerMiddleware(hashHistory);
const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  applyMiddleware(sagaMiddleware, thunk, router),
  autoRehydrate(),
);
export default function configureStore(initialState: Object) {
  const store = createStore(rootReducer, initialState, enhancer);

  sagaMiddleware.run(rootSaga);

  persistStore(store, {
    storage: localForage,
    blacklist: ['denon', 'routing'],
  });

  return store;
}