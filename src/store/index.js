import { configureStore } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import serviceApp from 'reducers';

const initStore = () => {
  const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
    // Check if the Redux DevTools extension is available
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      return configureStore({
        reducer: serviceApp,
        middleware: [...middlewares],
        devTools: window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(),
      });
    }
  }

  return configureStore({
    reducer: serviceApp,
    middleware: [...middlewares],
  });
};

export default initStore;

