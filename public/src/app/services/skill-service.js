var fetch = require('../lib/fetch');
var debug = require('debug')('game:services:skill');

module.exports = {
  fetch: function() {
    debug('fetching request');

    return fetch('/skills')
      .then(function(response) {
        debug('fetched');

        return response;
      });
  }
};
