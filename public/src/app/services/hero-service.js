var request = require('../lib/superagent');
var debug = require('debug')('game:services:hero');
var mediator = require('../mediator');
var makeUrl = require('make-url');
var assign = require('object-assign');

// TODO: plural on single name
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
  },

  update: function(data) {
    var defer;

    debug('update hero %o', data);

    defer = request
      .patch('/heroes/me')
      .send(data)
      .promise();

    defer
      .then(function() {
        mediator.currentHero = assign(mediator.currentHero, data);
        debug('updated');
      });

    return defer;
  },

  changePassword: function(data) {
    var defer;

    debug('update hero password %o', data);

    defer = request
      .put('/heroes/me/change-password')
      .send(data)
      .promise();

    defer
      .then(function() {
        debug('updated password');
      });

    return defer;
  },

  removeThing: function(id) {
    var defer;

    debug('removing thing %s', id);

    defer = request
      .del(makeUrl('/heroes/me/things/:id', id))
      .promise();

    defer
      .then(function() {
        debug('thing removed %s', id);
      });

    return defer;
  },

  dressThing: function(id) {
    var defer;

    debug('dress thing %s', id);

    defer = request
      .put(makeUrl('/heroes/me/things/:id/dress', id))
      .promise();

    defer
      .then(function() {
        debug('thing dressed %s', id);
      });

    return defer;
  },

  undressThing: function(id) {
    var defer;

    debug('undress thing %s', id);

    defer = request
      .put(makeUrl('/heroes/me/things/:id/undress', id))
      .promise();

    defer
      .then(function() {
        debug('thing undressed %s', id);
      });

    return defer;
  }
};
