var request = require('../lib/superagent');
var debug = require('debug')('game:services:hero');
var mediator = require('../mediator');
var makeUrl = require('make-url');
var assign = require('object-assign');

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
        mediator.currentUser = response;
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
        mediator.currentUser = assign(mediator.currentUser, data);
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
  },

  undressThings: function() {
    var defer;

    debug('undress things');

    defer = request
      .put('/heroes/me/things/undress')
      .promise();

    defer
      .then(function() {
        debug('things undressed');
      });

    return defer;
  },

  newComplect: function(data) {
    var defer;

    debug('new complect %o', data);

    defer = request
      .post('/heroes/me/complects')
      .send(data)
      .promise();

    defer
      .then(function() {
        debug('created');
      });

    return defer;
  },

  deleteComplect: function(id) {
    var defer;

    debug('delete complect %s', id);

    defer = request
      .del(makeUrl('/heroes/me/complects/:id', id))
      .promise();

    defer
      .then(function() {
        debug('complect deleted %s', id);
      });

    return defer;
  },

  applyComplect: function(id) {
    var defer;

    debug('appling complect %s', id);

    defer = request
      .put(makeUrl('/heroes/me/complects/:id/apply', id))
      .promise();

    defer
      .then(function() {
        debug('complect applied %s', id);
      });

    return defer;
  },

  moveOnIsland: function(x, y) {
    var defer;

    debug('move on island to %s:%s', x, y);

    defer = request
      .put(makeUrl('/heroes/me/island/move/:x/:y', x, y))
      .promise();

    defer
      .then(function() {
        debug('moved on island to %s:%s', x, y);
      });

    return defer;
  }
};
