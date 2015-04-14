var co = require('co');
var debug = require('debug')('game:socket');
var loadUser = require('./middlewares/load-user');

module.exports = function(io) {
  io.use(function(socket, done) {
    var accessToken = socket.handshake.query.token;

    co(function *() {
      var user = yield loadUser(accessToken);

      if (user) {
        socket.user = user;
        debug('user provided');
      }

      done();
    });
  });

  io.on('connection', function(socket) {
    debug('connected %s', socket.user._id);
  });

  require('../app/socket/chat')(io);
};
