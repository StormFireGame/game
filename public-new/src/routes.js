import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import HomePage from './components/pages/Home';
import NotFoundPage from './components/pages/NotFound';
import HeroPage from './components/pages/Hero';
import App from './components/App';

import mediator from './mediator';

export default (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" getComponent={(location, cb) => {
        cb(null, mediator.loggedInHero ? HeroPage : HomePage);
      }}
      />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
);
