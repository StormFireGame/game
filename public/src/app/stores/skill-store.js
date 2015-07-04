import AppDispatcher from '../app-dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';

import SkillConstants from '../constants/skill-constants';

import debugLib from '../lib/debug';

const debug = debugLib('stores:skill');

const CHANGE_EVENT = 'change';

let _skills = [];

function loadData(data) {
  _skills = data;
  debug('data loaded');
}

var SkillStore = assign({}, EventEmitter.prototype, {
  get() {
    return _skills;
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
    case SkillConstants.SKILLS_RECEIVE:
      loadData(action.data);
      break;

    default:
      return true;
  }

  SkillStore.emitChange();

  return true;
});

export default SkillStore;
