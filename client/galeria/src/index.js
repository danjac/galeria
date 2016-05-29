import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './components/app';
import Front from './components/front';
import Upload from './components/upload';
import Image from './components/image';
import Login from './components/login';
import Signup from './components/signup';
import store from './store';

import { getCurrentUser } from './actions';
import * as api from './actions/api';

const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(getCurrentUser());

const authRequired = (nextState, replace) => {
  // tbd: localStorage can store user details
  if (!api.getAuthToken()) {
    replace('/login/');
  }
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Front} />
        <Route path="/upload/" component={Upload} onEnter={authRequired} />
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Signup} />
        <Route path="/image/:id/" component={Image} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
