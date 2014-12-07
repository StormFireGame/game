'use strict';

var React = require('react'),
    Router = require('react-router'),
    routes = require('./routes');

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});
