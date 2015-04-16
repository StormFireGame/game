var React = require('react');
var Router = require('react-router');
var socket = require('socket.io-client');

var config = require('./config/application');
var environmentConfig = require('./config/environment');
var mediator = require('./mediator');

var routes = require('./routes');

var debug = require('debug')('game:application');

var injectTapEventPlugin = require('react-tap-event-plugin');

var io = socket.connect(environmentConfig[config.environment].api.root, {
  query: 'token=' + mediator.accessToken
});

require('./config/io')(io);

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

Router.run(routes, function(Handler) {
  React.render(React.createElement(Handler), document.body);

  debug('game app rendered');
});
