var request = require('../lib/superagent');
var debug = require('debug')('game:services:island');

module.exports = {
  fetch: function() {
    var defer;

    debug('fetching request');

    defer = request
      .get('/island')
      .promise();

    defer
      .then(function() {
        debug('fetched');
      });

    return defer;
  }
};
