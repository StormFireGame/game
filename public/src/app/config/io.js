import mediator from '../mediator';

import debugLib from '../lib/debug';

const debug = debugLib('config:socket');

export default (io) => {
  mediator.socket = io;

  io.on('connect', () => {
    debug('connected');
  });

  io.on('disconnect', () => {
    debug('disconnected');
  });
};
