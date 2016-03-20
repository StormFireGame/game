import React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';

import HomePage from './components/pages/Home';
import NotFoundPage from './components/pages/NotFound';
import HeroPage from './components/pages/Hero';
import App from './components/App';
import Preferences from './components/pages/preferences/Index';
import HeroInventoryPage from './components/pages/HeroInventory';
import PreferencesGeneralPage from './components/pages/preferences/General';
import PreferencesImagesPage from './components/pages/preferences/Images';

import mediator from './mediator';

export default (
  <Router history={hashHistory}>
    <Route component={App}>
      <Route path="/" getComponent={(location, cb) => {
        cb(null, mediator.loggedInHero ? HeroPage : HomePage);
      }}
      />
      <Route path="preferences" component={Preferences}>
        <IndexRedirect to="/preferences/general" />
        <Route path="general" component={PreferencesGeneralPage} />
        <Route path="images" component={PreferencesImagesPage} />
      </Route>
      <Route path="hero/inventory" component={HeroInventoryPage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
);
