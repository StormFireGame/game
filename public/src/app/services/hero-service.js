import fetch from '../lib/fetch';
import debugLib from '../lib/debug';
import mediator from '../mediator';
import makeUrl from 'make-url';
import assign from 'object-assign';

const debug = debugLib('services:hero');

export default {
  new(data) {
    debug('new request %o', data);

    return fetch('/heroes', {
      method: 'POST',
      body: data
    }).then((response) => {
      debug('created');
      return response;
    });
  },

  fetch() {
    debug('fetching request');

    return fetch('/heroes/me')
      .then((response) => {
        debug('fetched');
        mediator.currentUser = response;
        return response;
      });
  },

  increase(area) {
    const idOrName = arguments[1];

    debug('increasing request %s %s', area, idOrName);

    return fetch(makeUrl('/heroes/me/increase/:area/:idOrName', {
      area: area,
      idOrName: idOrName
    }), {
      method: 'PUT'
    }).then(() => {
      debug('increased');
    });
  },

  update(data) {
    debug('update hero %o', data);

    return fetch('/heroes/me', {
      method: 'PATCH',
      body: data
    }).then(() => {
      mediator.currentUser = assign(mediator.currentUser, data);
      debug('updated');
    });
  },

  changePassword(data) {
    debug('update hero password %o', data);

    return fetch('/heroes/me/change-password', {
      method: 'PUT',
      body: data
    }).then(() => {
      debug('updated password');
    });
  },

  removeThing(id) {
    debug('removing thing %s', id);

    return fetch(makeUrl('/heroes/me/things/:id', id), {
      method: 'DELETE'
    }).then(() => {
      debug('thing removed %s', id);
    });
  },

  dressThing(id) {
    debug('dress thing %s', id);

    return fetch(makeUrl('/heroes/me/things/:id/dress', id), {
      method: 'PUT'
    }).then(() => {
      debug('thing dressed %s', id);
    });
  },

  undressThing(id) {
    debug('undress thing %s', id);

    return fetch(makeUrl('/heroes/me/things/:id/undress', id), {
      method: 'PUT'
    }).then(() => {
      debug('thing undressed %s', id);
    });
  },

  undressThings() {
    debug('undress things');

    return fetch('/heroes/me/things/undress', {
      method: 'PUT'
    }).then(() => {
      debug('things undressed');
    });
  },

  newComplect(data) {
    debug('new complect %o', data);

    return fetch('/heroes/me/complects', {
      method: 'POST',
      body: data
    }).then((response) => {
      debug('created');

      return response;
    });
  },

  deleteComplect(id) {
    debug('delete complect %s', id);

    return fetch(makeUrl('/heroes/me/complects/:id', id), {
      method: 'DELETE'
    }).then(() => {
      debug('complect deleted %s', id);
    });
  },

  applyComplect(id) {
    debug('appling complect %s', id);

    return fetch(makeUrl('/heroes/me/complects/:id/apply', id), {
      method: 'PUT'
    }).then(() => {
      debug('complect applied %s', id);
    });
  },

  moveOnIsland(x, y) {
    debug('move on island to %s:%s', x, y);

    return fetch(makeUrl('/heroes/me/island/move/:x/:y', x, y), {
      method: 'PUT'
    }).then(() => {
      debug('moved on island to %s:%s', x, y);
    });
  }
};
