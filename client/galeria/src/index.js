import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import configureStore from './store';
import createRoutes from './routes';

import { getCurrentUser } from './actions/auth';

const store = configureStore(browserHistory);

store.dispatch(getCurrentUser());

ReactDOM.render(
  <Provider store={store}>
    {createRoutes(browserHistory, store)}
  </Provider>,
  document.getElementById('app')
);
