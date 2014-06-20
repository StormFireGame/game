var mongoose = require('mongoose');

module.exports = function(config) {
  var db;

  console.log('Connecting to database at ' + config.mongoose.url);
  mongoose.connect(config.mongoose.url);
  db = mongoose.connection;
};
