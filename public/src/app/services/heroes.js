var request = require('../lib/superagent');
var debug = require('debug')('game:services:heroes');
var mediator = require('../mediator');
var makeUrl = require('make-url');

module.exports = {
  new: function(data) {
    var defer;

    debug('new request %o', data);

    defer = request
      .post('/heroes')
      .send(data)
      .promise();

    defer
      .then(function() {
        debug('created');
      });

    return defer;
  },

  fetch: function() {
    var defer;

    debug('fetching request');

    defer = request
      .get('/heroes/me')
      .promise();

    defer
      .then(function(response) {
        debug('fetched');
        mediator.currentHero = response;
      });

    return defer;
  },

  increase: function(area) {
    var idOrName = arguments[1];
    var defer;

    debug('increasing request %s %s', area, idOrName);

    defer = request
      .put(makeUrl('/heroes/me/increase/:area/:idOrName', {
        area: area,
        idOrName: idOrName
      }))
      .promise();

    defer
      .then(function() {
        debug('increased');
      });

    return defer;
  }
};
