var fetch = require('../lib/fetch');
var debug = require('debug')('game:services:island');

module.exports = {
  fetch: function() {
    debug('fetching request');

    return fetch('/island')
      .then(function(response) {
        debug('fetched');

        return response;
      });
  }
};
