var assign = require('object-assign');

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
  },

  undressThings: function() {
    return HeroService.undressThings()
      .then(this.fetch);
  },

  newComplect: function(data) {
    return HeroService.newComplect(data)
      .then(function(response) {
        assign(data, response);
        HeroActions.complectCreated(data);
      });
  },

  deleteComplect: function(id) {
    return HeroService.deleteComplect(id)
      .then(function() {
        HeroActions.complectDeleted(id);
      });
  },

  applyComplect: function(id) {
    return HeroService.applyComplect(id)
      .then(this.fetch);
  },

  moveOnIsland: function(x, y) {
    return HeroService.moveOnIsland(x, y)
      .then(function() {
        HeroActions.movedOnIsland(x, y);
      });
  }

};
