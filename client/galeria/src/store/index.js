import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

export default function (history) {
  const middleware = applyMiddleware(
    thunk,
    createLogger(),
    routerMiddleware(history)
  );

  return createStore(reducers, middleware);
}
