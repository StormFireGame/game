var debug = require('debug')('game:heroController');

var Hero = require('../models/hero');
var TableExperience = require('../models/table-experience');

exports.create = function *() {
  var body = this.request.body;
  var hero;

  debug('hero create %s ...', body.login);

  try {
    hero = new Hero(body);
    hero = yield hero.save();
    debug('hero created');
  } catch(err) {
    if (err.name === 'ValidationError') {
      debug('hero validation errors');
      this.status = 422;
    } else {
      this.status = 500;
    }

    this.body = err;
    return;
  }

  this.status = 204;
};

exports.show = function *() {
  var hero = yield Hero
    .findById(this.req.user)
    .populate('skills.skill')
    .exec();

  var tableExperience = yield TableExperience
    .findOne({ level: hero.level + 1 })
    .exec();

  var heroObj = hero.toJSON();

  heroObj.nextLevelExperience = tableExperience.experience;

  this.body = heroObj;
};
