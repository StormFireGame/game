import AppDispatcher from '../app-dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import _ from 'lodash';

import debugLib from '../lib/debug';

import HeroConstants from '../constants/hero-constants';

const debug = debugLib('stores:hero');

const CHANGE_EVENT = 'change';

let hero = {};

function loadData(data) {
  hero = data;
  debug('data loaded');
}

function update(data) {
  hero = assign(hero, data);
}

function removeComplect(id) {
  const index = _.findIndex(hero.complects, { id: id });
  hero.complects.splice(index, 1);
}

function removeThing(id) {
  const index = _.findIndex(hero.things, { id: id });
  hero.things.splice(index, 1);

  hero.complects.forEach((complect) => {
    if (complect.things.indexOf(id) !== -1) {
      removeComplect(complect.id);
    }
  });
}

function newComplect(data) {
  hero.complects.push(data);
}

function deleteComplect(id) {
  const index = _.findIndex(hero.complects, { id: id });
  hero.complects.splice(index, 1);
}

function movedOnIsland(x, y) {
  hero.location.coordinateX = x;
  hero.location.coordinateY = y;
}

const HeroStore = assign({}, EventEmitter.prototype, {
  get() {
    return hero;
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

export default HeroStore;
