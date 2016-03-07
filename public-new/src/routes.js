import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import HomePage from './components/pages/Home';
import NotFoundPage from './components/pages/NotFound';
import HeroPage from './components/pages/Hero';
import Master from './components/Master';

import mediator from './mediator';

export default (
  <Router history={browserHistory}>
    <Route component={Master}>
      <Route path="/" getComponent={(location, cb) => {
        cb(null, mediator.hero ? HeroPage : HomePage);
      }} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
);
