var AppDispatcher = require('../app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var debug = require('debug')('game:stores:island');

var IslandConstants = require('../constants/island-constants');

var CHANGE_EVENT = 'change';

var _island = {};

function loadData(data) {
  _island = data;
  debug('data loaded');
}

var IslandStore = assign({}, EventEmitter.prototype, {
  get: function() {
    return _island;
  },

  emitChange: function() {
    debug('changed');
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case IslandConstants.ISLAND_RECEIVE:
      loadData(action.data);
      break;

    default:
      return true;
  }

  IslandStore.emitChange();

  return true;
});

module.exports = IslandStore;
