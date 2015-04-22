var fetch = require('../lib/fetch');
var debug = require('debug')('game:services:hero-image');

module.exports = {
  fetch: function() {
    debug('fetching request');

    return fetch('/hero-images')
      .then(function(response) {
        debug('fetched');
        return response;
      });
  }
};
