'use strict';

var React = require('react'),
    Router = require('react-router'),

    App = require('./app'),
    SessionsNewPage = require('./pages/sessions/new'),

    Route = Router.Route;

var routes = (
  <Route path='/' handler={App}>
    <Route path='sessions/new' handler={SessionsNewPage} />
  </Route>
);

module.exports = routes;
