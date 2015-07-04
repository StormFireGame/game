import AppDispatcher from '../app-dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';

import debugLib from '../lib/debug';

import IslandConstants from '../constants/island-constants';

const debug = debugLib('stores:island');

const CHANGE_EVENT = 'change';

let _island = {};

function loadData(data) {
  _island = data;
  debug('data loaded');
}

var IslandStore = assign({}, EventEmitter.prototype, {
  get() {
    return _island;
  },

  emitChange() {
    debug('changed');
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {
    case IslandConstants.ISLAND_RECEIVE:
      loadData(action.data);
      break;

    default:
      return true;
  }

  IslandStore.emitChange();

  return true;
});

export default IslandStore;
