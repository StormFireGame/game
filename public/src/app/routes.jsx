import React from 'react';
import Router from 'react-router';

import Master from './pages/master';
import Home from './pages/home';
import HeroNewPage from './pages/hero/new';
import HeroShowPage from './pages/hero/show';
import HeroInventoryPage from './pages/hero/inventory';

import HeroPreferencesMaster from './pages/hero/preferences/master';
import HeroPreferencesGeneralPage from './pages/hero/preferences/general';
import HeroPreferencesSecurityPage from './pages/hero/preferences/security';
import HeroPreferencesImagesPage from './pages/hero/preferences/images';

import IslandPage from './pages/island';

const Route = Router.Route;

export default (
  <Route path="/" handler={Master}>
    <Route path="/" handler={Home} />
    <Route path="heroes/new" handler={HeroNewPage} />
    <Route name="hero" path="hero" handler={HeroShowPage} />
    <Route path="hero/inventory" handler={HeroInventoryPage} />
    <Route path="hero/preferences" handler={HeroPreferencesMaster}>
      <Route path="general" handler={HeroPreferencesGeneralPage} />
      <Route path="security" handler={HeroPreferencesSecurityPage} />
      <Route path="images" handler={HeroPreferencesImagesPage} />
    </Route>
    <Route path="island" handler={IslandPage } />
  </Route>
);
