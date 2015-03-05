var React = require('react');
var Router = require('react-router');

var Master = require('./pages/master');
var Home = require('./pages/home');
var HeroNewPage = require('./pages/hero/new');
var HeroShowPage = require('./pages/hero/show');

var HeroPreferencesMaster = require('./pages/hero/preferences/master');
var HeroPreferencesGeneralPage = require('./pages/hero/preferences/general');
var HeroPreferencesSecurityPage = require('./pages/hero/preferences/security');
var HeroPreferencesImagesPage = require('./pages/hero/preferences/images');

var Route = Router.Route;
var DefaultRoute = Route.DefaultRoute;

var routes = (
  <Route path='/' handler={Master}>
    <Route path='/' handler={Home} />
    <Route path='heroes/new' handler={HeroNewPage} />
    <Route name='hero' path='hero' handler={HeroShowPage} />
    <Route path='hero/preferences' handler={HeroPreferencesMaster}>
      <Route path='general' handler={HeroPreferencesGeneralPage} />
      <Route path='security' handler={HeroPreferencesSecurityPage} />
      <Route path='images' handler={HeroPreferencesImagesPage} />
    </Route>
  </Route>
);

module.exports = routes;
