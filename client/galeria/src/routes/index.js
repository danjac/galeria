import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from '../components/app';
import Front from '../components/front';
import Upload from '../components/upload';
import Image from '../components/image';
import Login from '../components/login';
import Signup from '../components/signup';

export default function (history, store) {
  const authRequired = (nextState, replace) => {
    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) {
      replace('/login/');
    }
  };

  return (
    <Router history={syncHistoryWithStore(history, store)}>
      <Route path="/" component={App}>
        <IndexRoute component={Front} />
        <Route path="/upload/" component={Upload} onEnter={authRequired} />
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Signup} />
        <Route path="/image/:id/" component={Image} />
      </Route>
    </Router>
  );
}
