var mongoose = require('mongoose');

module.exports = function(config) {
  var db;

  console.log('Connecting to database at ' + config.mongo.url);
  mongoose.connect(config.mongo.url);
  db = mongoose.connection;

  mongoose.connection.on('error', function(err) {
    console.log(err);
  });
};
