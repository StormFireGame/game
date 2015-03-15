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
  },

  removeThing: function(id) {
    return HeroService.removeThing(id)
      .then(function() {
        HeroActions.thingRemoved(id);
      });
  },

  dressThing: function(id) {
    return HeroService.dressThing(id)
      .then(this.fetch);
  },

  undressThing: function(id) {
    return HeroService.undressThing(id)
      .then(this.fetch);
  }

};
