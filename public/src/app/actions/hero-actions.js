import AppDispatcher from '../app-dispatcher';
import HeroConstants from '../constants/hero-constants';

export default {
  receive(data) {
    AppDispatcher.handleAction({
      actionType: HeroConstants.HERO_RECEIVE,
      data: data
    });
  },
  updated(data) {
    AppDispatcher.handleAction({
      actionType: HeroConstants.HERO_UPDATED,
      data: data
    });
  },
  thingRemoved(id) {
    AppDispatcher.handleAction({
      actionType: HeroConstants.HERO_THING_REMOVED,
      id: id
    });
  },
  complectCreated(data) {
    AppDispatcher.handleAction({
      actionType: HeroConstants.HERO_COMPLECT_CREATED,
      data: data
    });
  },
  complectDeleted(id) {
    AppDispatcher.handleAction({
      actionType: HeroConstants.HERO_COMPLECT_DELETED,
      id: id
    });
  },
  movedOnIsland(x, y) {
    AppDispatcher.handleAction({
      actionType: HeroConstants.HERO_MOVED_ON_ISLAND,
      x: x,
      y: y
    });
  }
};
