'use strict';

var AppDispatcher = require('../app-dispatcher'),
    ActionTypes = require('../constants/action-types');

var AppActions = {
  message: function() {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.MESSAGE
    });
  }
};

module.exports = AppActions;
