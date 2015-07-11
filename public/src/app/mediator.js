import { EventEmitter } from 'events';
import assign from 'object-assign';
import socket from 'socket.io-client';
import store from 'store';

import config from './config/application';
import environmentConfig from './config/environment';

import configIO from './config/io';

// store.set('accessToken', 'creator');
export default assign(new EventEmitter(), {
  accessToken: store.get('accessToken'),
  currentUser: null,
  socket: null,
  connectSocket() {
    if (!this.accessToken) return;
    const io = socket.connect(environmentConfig[config.environment].api.root, {
      query: 'token=' + this.accessToken
    });

    configIO(io);
  }
});
