var mongoose = require('mongoose');
var debug = require('debug')('game:mongoose');

module.exports = function(config) {
  debug('connecting to database at %s', config.mongo.url);
  mongoose.connect(config.mongo.url);

  mongoose.connection.on('error', function(err) {
    debug('error %s', err);
  });
};
