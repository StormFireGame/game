var AppDispatcher = require('../app-dispatcher');
var HeroImageConstants = require('../constants/hero-image-constants');

module.exports = {
  receive: function(data) {
    AppDispatcher.handleAction({
      actionType: HeroImageConstants.HERO_IMAGES_RECEIVE,
      data: data
    });
  },
};
