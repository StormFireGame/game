var fetch = require('../lib/fetch');
var debug = require('debug')('game:services:hero');
var mediator = require('../mediator');
var makeUrl = require('make-url');
var assign = require('object-assign');

module.exports = {
  new: function(data) {
    debug('new request %o', data);

    return fetch('/heroes', {
      method: 'POST',
      body: data
    }).then(function(response) {
        debug('created');
        return response;
      });
  },

  fetch: function() {
    debug('fetching request');

    return fetch('/heroes/me')
      .then(function(response) {
        debug('fetched');
        mediator.currentUser = response;
        return response;
      });
  },

  increase: function(area) {
    var idOrName = arguments[1];

    debug('increasing request %s %s', area, idOrName);

    return fetch(makeUrl('/heroes/me/increase/:area/:idOrName', {
      area: area,
      idOrName: idOrName
    }), {
      method: 'PUT'
    }).then(function() {
        debug('increased');
      });
  },

  update: function(data) {
    debug('update hero %o', data);

    return fetch('/heroes/me', {
      method: 'PATCH',
      body: data
    }).then(function() {
        mediator.currentUser = assign(mediator.currentUser, data);
        debug('updated');
      });
  },

  changePassword: function(data) {
    debug('update hero password %o', data);

    return fetch('/heroes/me/change-password', {
      method: 'PUT',
      body: data
    }).then(function() {
        debug('updated password');
      });
  },

  removeThing: function(id) {
    debug('removing thing %s', id);

    return fetch(makeUrl('/heroes/me/things/:id', id), {
      method: 'DELETE'
    }).then(function() {
        debug('thing removed %s', id);
      });
  },

  dressThing: function(id) {
    debug('dress thing %s', id);

    return fetch(makeUrl('/heroes/me/things/:id/dress', id), {
      method: 'PUT'
    }).then(function() {
        debug('thing dressed %s', id);
      });
  },

  undressThing: function(id) {
    debug('undress thing %s', id);

    return fetch(makeUrl('/heroes/me/things/:id/undress', id), {
      method: 'PUT'
    }).then(function() {
        debug('thing undressed %s', id);
      });
  },

  undressThings: function() {
    debug('undress things');

    return fetch('/heroes/me/things/undress', {
      method: 'PUT'
    }).then(function() {
        debug('things undressed');
      });
  },

  newComplect: function(data) {
    debug('new complect %o', data);

    return fetch('/heroes/me/complects', {
      method: 'POST',
      body: data
    }).then(function(response) {
        debug('created');

        return response;
      });
  },

  deleteComplect: function(id) {
    debug('delete complect %s', id);

    return fetch(makeUrl('/heroes/me/complects/:id', id), {
      method: 'DELETE'
    }).then(function() {
        debug('complect deleted %s', id);
      });
  },

  applyComplect: function(id) {
    debug('appling complect %s', id);

    return fetch(makeUrl('/heroes/me/complects/:id/apply', id), {
      method: 'PUT'
    }).then(function() {
        debug('complect applied %s', id);
      });
  },

  moveOnIsland: function(x, y) {
    debug('move on island to %s:%s', x, y);

    return fetch(makeUrl('/heroes/me/island/move/:x/:y', x, y), {
      method: 'PUT'
    }).then(function() {
        debug('moved on island to %s:%s', x, y);
      });
  }
};
