var SkillActions = require('../actions/skill-actions');
var SkillService = require('../services/skill-service');

module.exports = {

  fetch: function() {
    SkillService.fetch()
      .then(function(response) {
        SkillActions.receive(response);
      });
  }

};
