var React = require('react');
var Router = require('react-router');

var Master = require('./pages/master');
var Home = require('./pages/home');
var HeroNewPage = require('./pages/hero/new');
var HeroShowPage = require('./pages/hero/show');
var HeroInventoryPage = require('./pages/hero/inventory');

var HeroPreferencesMaster = require('./pages/hero/preferences/master');
var HeroPreferencesGeneralPage = require('./pages/hero/preferences/general');
var HeroPreferencesSecurityPage = require('./pages/hero/preferences/security');
var HeroPreferencesImagesPage = require('./pages/hero/preferences/images');

var IslandPage = require('./pages/island');

var Route = Router.Route;

var routes = (
  <Route path='/' handler={Master}>
    <Route path='/' handler={Home} />
    <Route path='heroes/new' handler={HeroNewPage} />
    <Route name='hero' path='hero' handler={HeroShowPage} />
    <Route path='hero/inventory' handler={HeroInventoryPage} />
    <Route path='hero/preferences' handler={HeroPreferencesMaster}>
      <Route path='general' handler={HeroPreferencesGeneralPage} />
      <Route path='security' handler={HeroPreferencesSecurityPage} />
      <Route path='images' handler={HeroPreferencesImagesPage} />
    </Route>
    <Route path='island' handler={IslandPage } />
  </Route>
);

module.exports = routes;
