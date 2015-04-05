var AppDispatcher = require('../app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var debug = require('debug')('game:stores:hero');

var HeroConstants = require('../constants/hero-constants');

var CHANGE_EVENT = 'change';

var _hero = {};

function loadData(data) {
  _hero = data;
  debug('data loaded');
}

function update(data) {
  _hero = assign(_hero, data);
}

function removeComplect(id) {
  var index = _.findIndex(_hero.complects, { _id: id });
  _hero.complects.splice(index, 1);
}

function removeThing(id) {
  var index = _.findIndex(_hero.things, { _id: id });
  _hero.things.splice(index, 1);

  _hero.complects.forEach((complect) => {
    if (complect.things.indexOf(id) !== -1) {
      removeComplect(complect.id);
    }
  });
}

function newComplect(data) {
  _hero.complects.push(data);
}

function deleteComplect(id) {
  var index = _.findIndex(_hero.complects, { _id: id });
  _hero.complects.splice(index, 1);
}

function movedOnIsland(x, y) {
  _hero.location.coordinateX = x;
  _hero.location.coordinateY = y;
}

var HeroStore = assign({}, EventEmitter.prototype, {
  get: function() {
    return _hero;
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
    case HeroConstants.HERO_RECEIVE:
      loadData(action.data);
      break;
    case HeroConstants.HERO_UPDATED:
      update(action.data);
      break;
    case HeroConstants.HERO_THING_REMOVED:
      removeThing(action.id);
      break;
    case HeroConstants.HERO_COMPLECT_CREATED:
      newComplect(action.data);
      break;
    case HeroConstants.HERO_COMPLECT_DELETED:
      deleteComplect(action.id);
      break;
    case HeroConstants.HERO_MOVED_ON_ISLAND:
      movedOnIsland(action.x, action.y);
      break;

    default:
      return true;
  }

  HeroStore.emitChange();

  return true;
});

module.exports = HeroStore;
