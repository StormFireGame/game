var heroConfig = require('../../config/hero'),

    moment = require('moment');

module.exports = {
  updateFeature: function(hero) {
    var hp, capacity;

    hero.feature.strength = hero.strength;
    hero.feature.dexterity = hero.dexterity;
    hero.feature.intuition = hero.intuition;
    hero.feature.health = hero.health;

    hero.feature.swords = hero.swords;
    hero.feature.axes = hero.axes;
    hero.feature.knives = hero.knives;
    hero.feature.clubs = hero.clubs;
    hero.feature.shields = hero.shields;

    hero.feature.protectionHead = hero.feature.protectionBreast =
    hero.feature.protectionBelly = hero.feature.protectionGroin =
    hero.feature.protectionLegs = 0;

    hero.feature.damageMin = hero.feature.damageMax = 0;

    hero.feature.accuracy = hero.feature.dodge =
    hero.feature.devastate = hero.feature.durability = 0;

    hero.feature.blockBreak = hero.feature.armorBreak = 0;

    hero.feature.strikeCount = heroConfig.default.strikeCount;
    hero.feature.blockCount = heroConfig.default.blockCount;

    hp = (hero.feature.hp) ? hero.feature.hp.split('|')[0] : 0;
    hero.feature.hp = hp + '|' + hero.hp + '|' + moment().valueOf();

    capacity = (hero.feature.capacity) ?
      hero.feature.capacity.split('|')[0] : 0;
    hero.feature.capacity = capacity + '|' + hero.capacity;

    // TODO: Skills and things

    this.updateModifiers(hero);
  },
  updateModifiers: function(hero) {
    var hp, capacity;

    hero.feature.damageMin = hero.feature.strength *
                             heroConfig.coefficient.damageMin;
    hero.feature.damageMax = hero.feature.strength *
                             heroConfig.coefficient.damageMax;

    hero.feature.accuracy = hero.feature.dexterity *
                            heroConfig.coefficient.accuracy;
    hero.feature.dodge = hero.feature.dexterity *
                         heroConfig.coefficient.accuracy;
    hero.feature.devastate = hero.feature.intuition *
                             heroConfig.coefficient.devastate;
    hero.feature.durability = hero.feature.intuition *
                              heroConfig.coefficient.durability;

    hp = hero.feature.hp.split('|');
    hp[1] = hero.feature.health * heroConfig.coefficient.hp;
    hero.feature.hp = hp.join('|');

    capacity = hero.feature.capacity.split('|');
    capacity[1] = hero.feature.strength * heroConfig.coefficient.capacity;
    hero.feature.capacity = capacity.join('|');
  }
};
