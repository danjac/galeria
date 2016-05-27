import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const middleware = applyMiddleware(
  thunk,
  createLogger(),
  routerMiddleware(browserHistory)
);

export default createStore(reducers, middleware);
