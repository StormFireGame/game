import AppDispatcher from '../app-dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';

import HeroImageConstants from '../constants/hero-image-constants';

import debugLib from '../lib/debug';

const debug = debugLib('stores:hero-images');

const CHANGE_EVENT = 'change';

let heroImages = [];

function loadData(data) {
  heroImages = data;
  debug('data loaded');
}

const HeroImageStore = assign({}, EventEmitter.prototype, {
  get() {
    return heroImages;
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
    case HeroImageConstants.HERO_IMAGES_RECEIVE:
      loadData(action.data);
      break;

    default:
      return true;
  }

  HeroImageStore.emitChange();

  return true;
});

export default HeroImageStore;
