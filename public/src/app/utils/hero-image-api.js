var HeroImageActions = require('../actions/hero-image-actions');
var HeroImageService = require('../services/hero-image-service');

module.exports = {

  fetch: function() {
    HeroImageService.fetch()
      .then(function(response) {
        HeroImageActions.receive(response);
      });
  }

};
