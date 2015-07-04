var _ = require('lodash');
var debug = require('debug')('game:socket:chat');

module.exports = function(io) {
  var toParticipant = function(user) {
    return _.pick(user.toJSON(), '_id', 'login', 'level');
  };

  io.on('connection', function(socket) {
    socket.emit('chat/participants',
      io.sockets.sockets.map((client) => toParticipant(client.user))
    );

    socket.broadcast.emit('chat/join', toParticipant(socket.user));

    socket.on('disconnect', function() {
      debug('disconnected %s', socket.user._id);

      socket.broadcast.emit('chat/leave', toParticipant(socket.user));
    });

    socket.on('chat/message', function(message) {
      var client;
      if (message.command === 'private') {
        client = io.sockets.sockets
          .find((item) => item.user.login === message.tail);
        client.emit('chat/message', message);
      } else {
        socket.broadcast.emit('chat/message', message);
      }
    });
  });
};
