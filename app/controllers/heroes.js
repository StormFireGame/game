var debug = require('debug')('game:controllers:heroes');
var _ = require('lodash');

var Hero = require('../models/hero');
var Skill = require('../models/skill');
var TableExperience = require('../models/table-experience');
var Thing = require('../models/thing');

var heroesHelper = require('../helpers/heroes');

exports.create = function *() {
  var body = this.request.body;
  var hero;

  debug('create %s ...', body.login);

  try {
    hero = new Hero(body);
    hero = yield hero.save();
    debug('created');
  } catch(err) {
    if (err.name === 'ValidationError') {
      debug('validation errors');
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
      .populate('things.thing')
      .populate('image')
      .exec();

  var tableExperience = yield TableExperience
    .findOne({ level: hero.level + 1 })
    .exec();

  var heroObj = hero.toJSON();
  var absoluteUrl = this.request.protocol + '://' + this.request.get('host');

  heroObj.nextLevelExperience = tableExperience.experience;

  if (heroObj.image) {
    heroObj.image.image = absoluteUrl + heroObj.image.image;
  }

  heroObj.things.forEach(function(thing) {
    thing.thing.image = absoluteUrl + thing.thing.image;
  });

  this.body = heroObj;
};

exports.increase = function *() {
  var hero = this.req.user;
  var heroSkill;
  var skill;
  var area = this.params.area;
  var id = this.params.id;
  var name = this.params.name;
  var paramKey = 'numberOf' + _.capitalize(area);

  debug('param increasing %s %s', area, id || name);

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
        return heroSkill.skill + '' === id;
      });

      if (!heroSkill) {
        try {
          skill = yield Skill.findById(id).exec();
        } catch(err) {
          if (err.name === 'CastError') {
            debug('skill to increase not found');
            this.status = 404;
          } else {
            this.status = 500;
          }
          return;
        }

        hero.skills.push({
          skill: skill,
          level: 0
        });

        heroSkill = hero.skills[hero.skills.length - 1];
      }

      heroSkill.level++;
      break;
  }

  try {
    yield hero.save();
  } catch(err) {
    debug('save error %o', err);
    this.status = 500;
    this.body = err;
    return;
  }

  this.status = 204;
};

exports.update = function *() {
  var hero = this.req.user;
  var body = this.request.body;

  debug('udpate %s %o ...', hero.login, body);

  yield hero.save();
  // TODO: a lot of try catch may be just remove it and add global error handler
  try {
    yield Hero.update({ _id: hero._id }, body).exec();
  } catch(err) {
    debug('save error %o', err);
    this.status = 500;
    this.body = err;
    return;
  }

  debug('updated');

  this.status = 204;
};

exports.changePassword = function *() {
  var hero = this.req.user;
  var body = this.request.body;
  var correctPassword = yield hero.comparePassword(body.password);

  debug('changing password %s ...', hero.login);

  if (!correctPassword) {
    debug('wrong password');
    this.status = 422;
    return;
  }

  hero.password = body.newPassword;

  try {
    yield hero.save();
  } catch(err) {
    debug('save error %o', err);
    this.status = 500;
    this.body = err;
    return;
  }

  debug('password updated');

  this.status = 204;
};

exports.removeThing = function *() {
  var hero = this.req.user;
  var id = this.params.id;

  debug('removing hero thing %s', id);

  if (!hero.things.pull({ _id: id })) {
    debug('thing to remove not found %s', id);
    this.status = 404;
    return;
  }

  yield hero.save();

  debug('hero thing removed %s', id);

  this.status = 204;
};

exports.dressThing = function *() {
  var hero = this.req.user;
  var id = this.params.id;
  var thing;

  debug('dressing hero thing %s', id);

  thing = yield Thing.findById(hero.things.id(id).thing).exec();

  if (!heroesHelper.canBeDressed(hero, thing)) {
    debug('thing can\'t be dressed %s', thing.id);
    this.status = 423;
    return;
  }

  yield Hero.update({ 'things._id': id },
    { '$set': { 'things.$.dressed': true } }).exec();

  debug('hero thing dressed %s', id);
  this.status = 204;
};

exports.undressThing = function *() {
  var id = this.params.id;

  debug('undressing hero thing %s', id);

  yield Hero.update({ 'things._id': id },
    { '$set': { 'things.$.dressed': false } }).exec();

  debug('hero thing undressed %s', id);
  this.status = 204;
};
