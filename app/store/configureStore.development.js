import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localforage';

import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

export default (initialState: ?RootReducer) => {
  const middleware = [];
  const enhancers = [];

  // saga midldeware
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });
  middleware.push(logger);

  // Router Middleware
  const router = routerMiddleware(hashHistory);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    push,
  };

  // Redux persist
  enhancers.push(autoRehydrate());

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));

  const enhancer = composeEnhancers(...enhancers);

  const store = createStore(rootReducer, initialState, enhancer);

  sagaMiddleware.run(rootSaga);

  persistStore(store, {
    storage: localForage,
    blacklist: ['denon', 'routing'],
  });

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      () => store.replaceReducer(require('../reducers')), // eslint-disable-line global-require
    );
  }

  return store;
};
