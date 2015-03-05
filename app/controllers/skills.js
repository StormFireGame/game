var debug = require('debug')('game:controllers:skills');

var Skill = require('../models/skill');

exports.index = function *() {
  var skills;

  debug('get');

  try {
    skills = yield Skill.find().exec();
    debug('gotted');
  } catch(err) {
    debug('getting error %o', err);
    this.status = 500;
    this.body = err;
    return;
  }

  this.body = skills;
};
