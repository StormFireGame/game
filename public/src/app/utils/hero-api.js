var HeroActions = require('../actions/hero-actions');
var HeroesService = require('../services/heroes');

module.exports = {

  fetch: function() {
    HeroesService.fetch()
      .then(function(response) {
        HeroActions.receive(response);
      });
  }

};
