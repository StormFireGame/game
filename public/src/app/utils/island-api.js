var IslandActions = require('../actions/island-actions');
var IslandService = require('../services/island-service');

module.exports = {

  fetch: function() {
    IslandService.fetch()
      .then(function(response) {
        IslandActions.receive(response);
      });
  }

};
