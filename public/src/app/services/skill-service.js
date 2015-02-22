var request = require('../lib/superagent');
var debug = require('debug')('game:services:skill');

module.exports = {
  fetch: function() {
    var defer;

    debug('fetching request');

    defer = request
      .get('/skills')
      .promise();

    defer
      .then(function() {
        debug('fetched');
      });

    return defer;
  }
};
