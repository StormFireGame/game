var debug = require('debug')('game:heroController');
var _ = require('lodash');

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

exports.increase = function *() {
  var hero = this.req.user;
  var heroSkill;
  var area = this.params.area;
  var id = this.params.id;
  var name = this.params.name;
  var paramKey = 'numberOf' + _.capitalize(area);

  debug('hero param increasing %s %s', area, id || name);

  if (hero[paramKey] === 0) {
    this.status = 423;
    return;
  }
  hero[paramKey]--;

  switch(area) {
    case 'abilities':
    case 'parameters':
      if (_.isUndefined(hero[name])) {
        this.status = 404;
        return;
      }

      hero[name]++;
      break;
    case 'skills':
      heroSkill = hero.skills.find(function(heroSkill) {
        return heroSkill._id + '' === id;
      });

      if (!heroSkill) {
        this.status = 404;
        return;
      }

      heroSkill.level++;
      break;
  }

  try {
    yield hero.save();
  } catch(err) {
    debug('hero save error %o', err);
    this.status = 500;
  }

  this.status = 204;
};
