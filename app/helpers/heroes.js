'use strict';

var moment = require('moment');
var debug = require('debug')('game:helpers:heroes');

var heroConfig = require('../../config/hero');
var TableExperience = require('../models/table-experience');

module.exports = {
  updateFeature: function(hero) {
    var hp;
    var capacity;
    var feature = hero.feature;

    feature.strength = hero.strength;
    feature.dexterity = hero.dexterity;
    feature.intuition = hero.intuition;
    feature.health = hero.health;

    feature.swords = hero.swords;
    feature.axes = hero.axes;
    feature.knives = hero.knives;
    feature.clubs = hero.clubs;
    feature.shields = hero.shields;

    feature.protectionHead = feature.protectionBreast =
    feature.protectionBelly = feature.protectionGroin =
    feature.protectionLegs = 0;

    feature.damageMin = feature.damageMax = 0;

    feature.accuracy = feature.dodge =
    feature.devastate = feature.durability = 0;

    feature.blockBreak = feature.armorBreak = 0;

    feature.strikeCount = heroConfig.default.strikeCount;
    feature.blockCount = heroConfig.default.blockCount;

    hp = (feature.hp) ? feature.hp.split('|')[0] : 0;
    feature.hp = hp + '|' + hero.hp + '|' + moment().valueOf();

    capacity = (feature.capacity) ? feature.capacity.split('|')[0] : 0;
    feature.capacity = capacity + '|' + hero.capacity;

    // TODO: Skills and things counting

    this.updateModifiers(hero);

    debug('hero features updated %s', hero.login);
  },
  updateModifiers: function(hero) {
    var hp;
    var capacity;
    var feature = hero.feature;

    feature.damageMin = feature.strength * heroConfig.coefficient.damageMin;
    feature.damageMax = feature.strength * heroConfig.coefficient.damageMax;

    feature.accuracy = feature.dexterity * heroConfig.coefficient.accuracy;
    feature.dodge = feature.dexterity * heroConfig.coefficient.accuracy;
    feature.devastate = feature.intuition * heroConfig.coefficient.devastate;
    feature.durability = feature.intuition * heroConfig.coefficient.durability;

    hp = feature.hp.split('|');
    hp[1] = feature.health * heroConfig.coefficient.hp;
    feature.hp = hp.join('|');

    capacity = feature.capacity.split('|');
    capacity[1] = feature.strength * heroConfig.coefficient.capacity;
    feature.capacity = capacity.join('|');
  },
  levelUp: function *(hero) {
    var tableExperiences = yield TableExperience.find({
        level: { $gt: hero.level },
        experience: { $lte: hero.experience }
      }).exec();

    tableExperiences.forEach(function(tableExperience) {
      hero.numberOfAbilities += tableExperience.numberOfAbilities;
      hero.numberOfSkills += tableExperience.numberOfSkills;
      hero.numberOfParameters += tableExperience.numberOfParameters;

      hero.money += tableExperience.money;
      hero.level++;

      debug('hero level up %s %s', hero.login, hero.level);
    });
  },
  thingCanBeDressed: function(hero, thing) {
    return (
      (!thing.strengthNeed || thing.strengthNeed <= hero.strength) &&
      (!thing.dexterityNeed || thing.dexterityNeed <= hero.dexterity) &&
      (!thing.intuitionNeed || thing.intuitionNeed <= hero.intuition) &&
      (!thing.healthNeed || thing.healthNeed <= hero.health) &&

      (!thing.swordsNeed || thing.swordsNeed <= hero.swords) &&
      (!thing.axesNeed || thing.axesNeed <= hero.axes) &&
      (!thing.knivesNeed || thing.knivesNeed <= hero.knives) &&
      (!thing.clubsNeed || thing.clubsNeed <= hero.clubs) &&
      (!thing.shieldsNeed || thing.shieldsNeed <= hero.shields)
    );
  },
  thingsCanBeDressed: function(hero, things) {
    for (let thing of things) {
      if (!this.thingCanBeDressed(hero, thing)) {
        return false;
      }
    }

    return true;
  }
};
