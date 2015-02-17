var AppDispatcher = require('../app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var HeroConstants = require('../constants/hero-constants');


var CHANGE_EVENT = 'change';

var _hero = {};

function loadData(data) {
  _hero = data;
}

var HeroStore = assign({}, EventEmitter.prototype, {
  get: function() {
    return _hero;
  },

  emitChange: function() {
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
    case HeroConstants.RECEIVE:
      loadData(action.data);
      break;

    default:
      return true;
  }

  HeroStore.emitChange();

  return true;
});

module.exports = HeroStore;
