var AppDispatcher = require('../app-dispatcher');
var SkillConstants = require('../constants/skill-constants');

module.exports = {
  receive: function(data) {
    AppDispatcher.handleAction({
      actionType: SkillConstants.SKILLS_RECEIVE,
      data: data
    });
  },
};
