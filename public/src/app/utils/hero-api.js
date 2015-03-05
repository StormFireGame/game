var HeroActions = require('../actions/hero-actions');
var HeroService = require('../services/hero-service');

module.exports = {

  fetch: function() {
    HeroService.fetch()
      .then(function(response) {
        HeroActions.receive(response);
      });
  },

  updateGeneral: function(data) {
    return HeroService.update(data)
      .then(function() {
        HeroActions.updated(data);
      });
  }

};
