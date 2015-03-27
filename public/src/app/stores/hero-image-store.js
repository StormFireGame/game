var AppDispatcher = require('../app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var HeroImageConstants = require('../constants/hero-image-constants');

var debug = require('debug')('game:stores:hero-images');

var CHANGE_EVENT = 'change';

var _heroImages = [];

function loadData(data) {
  _heroImages = data;
  debug('data loaded');
}

var HeroImageStore = assign({}, EventEmitter.prototype, {
  get: function() {
    return _heroImages;
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
    case HeroImageConstants.HERO_IMAGES_RECEIVE:
      loadData(action.data);
      break;

    default:
      return true;
  }

  HeroImageStore.emitChange();

  return true;
});

module.exports = HeroImageStore;
