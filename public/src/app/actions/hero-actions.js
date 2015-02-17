var AppDispatcher = require('../app-dispatcher');
var HeroConstants = require('../constants/hero-constants');

var HeroActions = {
  receive: function(data) {
    AppDispatcher.handleAction({
      actionType: HeroConstants.RECEIVE,
      data: data
    });
  },
};

module.exports = HeroActions;
