var AppDispatcher = require('../app-dispatcher');
var HeroConstants = require('../constants/hero-constants');

module.exports = {
  receive: function(data) {
    AppDispatcher.handleAction({
      actionType: HeroConstants.HERO_RECEIVE,
      data: data
    });
  },
  updated: function(data) {
    AppDispatcher.handleAction({
      actionType: HeroConstants.HERO_UPDATED,
      data: data
    });
  },
  thingRemoved: function(id) {
    AppDispatcher.handleAction({
      actionType: HeroConstants.HERO_THING_REMOVED,
      id: id
    });
  }
};
