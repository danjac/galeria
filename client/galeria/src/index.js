import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './components/app';
import Front from './components/front';
import Login from './components/login';
import store from './store';

import { getCurrentUser } from './actions';

const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(getCurrentUser());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Front} />
        <Route path="/login/" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
