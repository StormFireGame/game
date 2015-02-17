var React = require('react');
var Router = require('react-router');

var Master = require('./master');
var Home = require('./pages/home');
var HeroesNewPage = require('./pages/heroes/new');
var HeroesShowPage = require('./pages/heroes/show');

var Route = Router.Route;

var routes = (
  <Route path='/' handler={Master}>
    <Route path='/' handler={Home} />
    <Route path='heroes/new' handler={HeroesNewPage} />
    <Route name='hero' path='heroes/show' handler={HeroesShowPage} />
  </Route>
);

module.exports = routes;
