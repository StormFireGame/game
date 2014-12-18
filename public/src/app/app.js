'use strict';

var React = require('react'),
    Router = require('react-router'),
    routes = require('./routes'),
    injectTapEventPlugin = require('react-tap-event-plugin')


//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});
