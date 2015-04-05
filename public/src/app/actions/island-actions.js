var AppDispatcher = require('../app-dispatcher');
var IslandConstants = require('../constants/island-constants');

module.exports = {
  receive: function(data) {
    AppDispatcher.handleAction({
      actionType: IslandConstants.ISLAND_RECEIVE,
      data: data
    });
  }
};
