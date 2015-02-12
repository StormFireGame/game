var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var debug = require('debug')('game:application');

var injectTapEventPlugin = require('react-tap-event-plugin');


//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);

  debug('game app rendered');
});
