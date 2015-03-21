var debug = require('debug')('game:controllers:heroes');
var _ = require('lodash');

var Hero = require('../models/hero');
var Skill = require('../models/skill');
var TableExperience = require('../models/table-experience');
var HeroThing = require('../models/hero-thing');

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
      .populate('image')
      .deepPopulate('things.thing')
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

  heroObj.things.forEach((thing) => {
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
      heroSkill = hero.skills.find((heroSkill) => heroSkill.skill + '' === id);

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

  yield hero.removeThing(id);

  debug('hero thing removed %s', id);

  this.status = 204;
};

exports.dressThing = function *() {
  var id = this.params.id;
  var hero = yield Hero
      .findById(this.req.user)
      .deepPopulate('things.thing')
      .exec();

  var heroThing = hero.getThing(id);
  var thing;

  debug('dressing hero thing %s', id);

  if (!heroThing) {
    debug('hero thing not found %s', id);
    this.status = 404;
    return;
  }

  thing = heroThing.thing;

  if (!heroesHelper.thingCanBeDressed(hero, thing)) {
    debug('thing can\'t be dressed %s', thing.id);
    this.status = 423;
    return;
  }

  heroThing.dressed = true;
  yield heroThing.save();

  debug('hero thing dressed %s', id);
  this.status = 204;
};

exports.undressThing = function *() {
  var id = this.params.id;
  var hero = yield Hero
      .findById(this.req.user)
      .populate('things')
      .exec();

  var heroThing = hero.getThing(id);

  debug('undressing hero thing %s', id);

  if (!heroThing) {
    debug('hero thing not found %s', id);
    this.status = 404;
    return;
  }

  heroThing.dressed = false;

  yield heroThing.save();

  debug('hero thing undressed %s', id);
  this.status = 204;
};

exports.undressThings = function *() {
  var hero = this.req.user;

  debug('undressing hero things');

  yield HeroThing.update(
    { _id: { $in: hero.things }, dressed: true },
    { $set: { dressed: false } },
    { multi: true }).exec();

  debug('hero things undressed');

  this.status = 204;
};

exports.createComplect = function *() {
  var body = this.request.body;
  var ids = body.ids;
  var name = body.name;
  var hero = yield Hero
      .findById(this.req.user)
      .populate('things')
      .exec();

  debug('new hero complect %s', name);

  var dressedIds = hero.things
    .filter(thing => thing.dressed)
    .map(thing => thing.id);

  if (_.difference(ids, dressedIds).length) {
    debug('not compatible things for hero complect %s', name);
    this.status = 423;
    return;
  }

  hero.complects.push({
    name: name,
    things: ids
  });

  yield hero.save();

  debug('hero complect saved %s', name);

  this.body = {
    _id: hero.complects[hero.complects.length - 1].id
  };

  this.status = 200;
};

exports.deleteComplect = function *() {
  var hero = this.req.user;
  var id = this.params.id;

  debug('removing hero complect %s', id);

  if (!hero.complects.remove(id)) {
    debug('complect to remove not found %s', id);
    this.status = 404;
    return;
  }

  yield hero.save();

  debug('hero complect removed %s', id);

  this.status = 204;
};

exports.applyComplect = function *() {
  var id = this.params.id;
  var hero = yield Hero
      .findById(this.req.user)
      .deepPopulate('complects.things.thing')
      .populate('things')
      .exec();

  debug('appling hero complect %s', id);

  var complect = hero.complects.id(id);
  var dressedThingsIds;
  var complectThings;

  if (!complect) {
    debug('hero complect not found %s', id);
    this.status = 404;
    return;
  }

  // TODO: think about moving this to sep model method
  dressedThingsIds = hero.things
    .filter(thing => thing.dressed)
    .map(thing => thing._id);

  yield HeroThing.update(
    { _id: { $in: dressedThingsIds } },
    { $set: { dressed: false } },
    { multi: true }).exec();

  yield HeroThing.update(
    { _id: { $in: complect.things }, dressed: false },
    { $set: { dressed: true } },
    { multi: true }).exec();

  complectThings = complect.things.map((thing) => thing.thing);

  if (!heroesHelper.thingsCanBeDressed(hero, complectThings)) {
    yield HeroThing.update(
      { _id: { $in: complect.things }, dressed: true },
      { $set: { dressed: false } },
      { multi: true }).exec();

    yield HeroThing.update(
      { _id: { $in: dressedThingsIds }, dressed: false },
      { $set: { dressed: true } },
      { multi: true }).exec();

    debug('not compatible hero complect %s', id);
    this.status = 423;
    return;
  }

  debug('hero complect dressed %s', id);

  this.status = 204;
};
