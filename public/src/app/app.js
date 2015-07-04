import React from 'react';
import Router from 'react-router';
import socket from 'socket.io-client';

import config from './config/application';
import environmentConfig from './config/environment';
import mediator from './mediator';

import routes from './routes';

import debugLib from './lib/debug';

const debug = debugLib('application');

import injectTapEventPlugin from 'react-tap-event-plugin';

const io = socket.connect(environmentConfig[config.environment].api.root, {
  query: 'token=' + mediator.accessToken
});

import configIO from './config/io';
configIO(io);

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
