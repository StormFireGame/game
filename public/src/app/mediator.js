import { EventEmitter } from 'events';
import assign from 'object-assign';
import socket from 'socket.io-client';

import config from './config/application';
import environmentConfig from './config/environment';

import configIO from './config/io';

// localStorage.setItem('accessToken', 'creator');
export default assign(new EventEmitter(), {
  accessToken: window.localStorage.getItem('accessToken'),
  currentUser: null,
  socket: null,
  connectSocket() {
    const io = socket.connect(environmentConfig[config.environment].api.root, {
      query: 'token=' + this.accessToken
    });

    configIO(io);
  }
});
