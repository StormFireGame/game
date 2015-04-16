var mediator = require('../mediator');

var debug = require('debug')('game:config:socket');

module.exports = function(io) {
  mediator.socket = io;

  io.on('connect', function() {
    debug('connected');
  });

  io.on('disconnect', function() {
    debug('disconnected');
  });
};
