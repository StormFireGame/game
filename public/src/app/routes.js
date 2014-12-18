'use strict';

var React = require('react'),
    Router = require('react-router'),

    Master = require('./master.jsx'),
    Home = require('./pages/home.jsx'),
    HeroesNewPage = require('./pages/heroes/new.jsx'),

    Route = Router.Route;

var routes = (
  <Route path='/' handler={Master}>
    <Route path='/' handler={Home} />
    <Route path='heroes/new' handler={HeroesNewPage} />
  </Route>
);

module.exports = routes;
