import React from 'react';
import Router from 'react-router';

import routes from './routes';
import debugLib from './lib/debug';

import injectTapEventPlugin from 'react-tap-event-plugin';

const debug = debugLib('application');

// Needed for React Developer Tools
window.React = React;

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

Router.run(routes, (Handler) => {
  React.render(React.createElement(Handler), document.body);

  debug('game app rendered');
});
