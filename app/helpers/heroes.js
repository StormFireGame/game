var _ = require('lodash');
var debug = require('debug')('game:helpers:heroes');

var heroConfig = require('../../config/hero');
var TableExperience = require('../models/table-experience');

module.exports = {
  updateFeature: function *(hero) {
    var Hero = require('../models/hero');

    var hp;
    var capacity;
    var count;
    var feature = _.clone(hero.feature.toJSON());

    var populatedHero = yield Hero
      .findById(hero.id)
      .populate('skills.skill')
      .deepPopulate('things.thing')
      .exec();

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

    hp = feature.hp;
    capacity = feature.capacity;

    feature.hp = feature.capacity = 0;

    // Skills
    populatedHero.skills.forEach(skill => {
      skill.skill.features.forEach(skillFeature => {
        feature[skillFeature.name] += skill.level * skillFeature.plus;
      });
    });

    // Things
    populatedHero.things
      .filter(thing => thing.dressed)
      .forEach(thingWrap => {
        var thing = thingWrap.thing;
        [
          'strengthGive', 'dexterityGive', 'intuitionGive', 'healthGive',
          'swordsGive', 'axesGive', 'knivesGive', 'clubsGive', 'shieldsGive',

          'damageMin', 'damageMax',

          'protectionHead', 'protectionBreast', 'protectionBelly',
          'protectionGroin', 'protectionLegs',

          'accuracy', 'dodge', 'devastate', 'durability',

          'blockBreak', 'armorBreak',

          'hp', 'capacity',

          'strikeCount', 'blockCount'
        ].forEach(attr => {
          if (!thing[attr]) return;
          feature[attr.replace('Give', '')] += thing[attr];
        });
      });

    // Strike count
    count = populatedHero.things
      .filter(thing => {
        return thing.dressed &&
          ['sword', 'axe', 'knive', 'clubs'].indexOf(thing.thing.type) !== -1;
      }).length;

    if (count === 2) feature.strikeCount++;

    // Modifiers
    feature.damageMin += feature.strength * heroConfig.coefficient.damageMin;
    feature.damageMax += feature.strength * heroConfig.coefficient.damageMax;

    feature.accuracy += feature.dexterity * heroConfig.coefficient.accuracy;
    feature.dodge += feature.dexterity * heroConfig.coefficient.accuracy;
    feature.devastate += feature.intuition * heroConfig.coefficient.devastate;
    feature.durability += feature.intuition * heroConfig.coefficient.durability;

    feature.hp += feature.health * heroConfig.coefficient.hp;
    feature.capacity += feature.strength * heroConfig.coefficient.capacity;

    // Hp
    feature.hp = {
      current: hp.current || 0,
      max: feature.hp,
      time: new Date().getTime()
    };

    // Capacity
    feature.capacity = {
      current: capacity.current || 0,
      max: feature.capacity
    };

    _.assign(hero.feature, feature);

    debug('hero features updated %s', hero.login);
  },
  levelUp: function *(hero) {
    var tableExperiences = yield TableExperience
      .find({
        level: { $gt: hero.level },
        experience: { $lte: hero.experience }
      })
      .exec();

    tableExperiences.forEach((tableExperience) => {
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
      if (!this.thingCanBeDressed(hero, thing)) return false;
    }

    return true;
  }
};
