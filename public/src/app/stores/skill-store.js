var AppDispatcher = require('../app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var SkillConstants = require('../constants/skill-constants');

var debug = require('debug')('game:stores:skill');

var CHANGE_EVENT = 'change';

var _skills = [];

function loadData(data) {
  _skills = data;
  debug('data loaded');
}

var SkillStore = assign({}, EventEmitter.prototype, {
  get: function() {
    return _skills;
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
    case SkillConstants.SKILLS_RECEIVE:
      loadData(action.data);
      break;

    default:
      return true;
  }

  SkillStore.emitChange();

  return true;
});

module.exports = SkillStore;
