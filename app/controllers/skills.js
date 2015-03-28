var debug = require('debug')('game:controllers:skills');

var Skill = require('../models/skill');

exports.index = function *() {
  debug('getting');

  var skills = yield Skill
    .find()
    .exec();

  this.body = skills;
};
