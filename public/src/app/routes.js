var React = require('react');
var Router = require('react-router');

var Master = require('./master.jsx');
var Home = require('./pages/home.jsx');
var HeroesNewPage = require('./pages/heroes/new.jsx');
var HeroesShowPage = require('./pages/heroes/show.jsx');

var Route = Router.Route;

var routes = (
  <Route path='/' handler={Master}>
    <Route path='/' handler={Home} />
    <Route path='heroes/new' handler={HeroesNewPage} />
    <Route path='heroes/show' handler={HeroesShowPage} />
  </Route>
);

module.exports = routes;
