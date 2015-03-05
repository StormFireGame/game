var request = require('../lib/superagent');
var debug = require('debug')('game:services:hero-image');

module.exports = {
  fetch: function() {
    var defer;

    debug('fetching request');

    defer = request
      .get('/hero-images')
      .promise();

    defer
      .then(function() {
        debug('fetched');
      });

    return defer;
  }
};
