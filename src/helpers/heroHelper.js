import debugLib from '../lib/debug';

import heroConfig from '../config/hero';
import mediator from '../mediator';

const debug = debugLib('helpers:hero');

export function init(hero) {
  Object.assign(hero, {
    login: 'Empty',
    level: -1,
    experience: 0,
    money: heroConfig.default.money,
    moneyArt: heroConfig.default.moneyArt,
    hp: heroConfig.default.hp,
    capacity: heroConfig.default.capacity,

    numberOfWins: 0,
    numberOfLosses: 0,
    numberOfDraws: 0,
    numberOfParameters: 0,
    numberOfAbilities: 0,
    numberOfSkills: 0,

    strength: heroConfig.default.strength,
    dexterity: heroConfig.default.dexterity,
    intuition: heroConfig.default.intuition,
    health: heroConfig.default.health,

    swords: heroConfig.default.swords,
    axes: heroConfig.default.axes,
    knives: heroConfig.default.knives,
    clubs: heroConfig.default.clubs,
    shields: heroConfig.default.shields,

    skills: [],
    things: [],
    complects: [],

    location: {
      island: '0',
      coordinateX: 0,
      coordinateY: 0,
      building: null,
    },

    created: new Date(),
  });

  this.levelUp(hero);
  this.updateFeature(hero);
}

export function updateFeature(hero) {
  const { skills, things } = mediator.storage;
  hero.feature = {};
  const feature = hero.feature;

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

  const hp = feature.hp || {
    current: 0,
    max: 0,
  };
  const capacity = feature.capacity || {
    current: 0,
    max: 0,
  };

  feature.hp = feature.capacity = 0;

  // Skills
  hero.skills.forEach((heroSkill) => {
    const skill = skills.find((item) => item.id === heroSkill.skill);
    skill.features.forEach(skillFeature => {
      feature[skillFeature.name] += heroSkill.level * skillFeature.plus;
    });
  });

  // Things
  hero.things
    .filter(item => item.dressed)
    .forEach(heroThing => {
      const thing = things.find(item => item.id === heroThing.id);
      [
        'strengthGive', 'dexterityGive', 'intuitionGive', 'healthGive',
        'swordsGive', 'axesGive', 'knivesGive', 'clubsGive', 'shieldsGive',

        'damageMin', 'damageMax',

        'protectionHead', 'protectionBreast', 'protectionBelly',
        'protectionGroin', 'protectionLegs',

        'accuracy', 'dodge', 'devastate', 'durability',

        'blockBreak', 'armorBreak',

        'hp', 'capacity',

        'strikeCount', 'blockCount',
      ].forEach(attr => {
        if (!thing[attr]) return;
        feature[attr.replace('Give', '')] += thing[attr];
      });
    });

  // Strike count
  const count = hero.things
    .filter(item => item.dressed)
    .filter(heroThing => {
      const thing = things.find(item => item.id === heroThing.id);
      return heroThing.dressed &&
        ['sword', 'axe', 'knive', 'clubs'].indexOf(thing.type) !== -1;
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
    time: new Date().getTime(),
  };

  // Capacity
  feature.capacity = {
    current: capacity.current || 0,
    max: feature.capacity,
  };

  debug('hero features updated %s', hero.login);
}

export function levelUp(hero) {
  const tableExperience = mediator.storage.tableExperience;

  const tableExperienceItems = tableExperience
    .filter((item) => item.level > hero.level && item.experience <= hero.experience);

  if (!tableExperienceItems.length) return;

  tableExperienceItems.forEach((item) => {
    hero.numberOfAbilities += item.numberOfAbilities;
    hero.numberOfSkills += item.numberOfSkills;
    hero.numberOfParameters += item.numberOfParameters;

    hero.money += item.money;
    hero.level++;

    debug('hero level up %s %s', hero.login, hero.level);
  });
}

export function thingCanBeDressed(hero, thing) {
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
}

export function thingsCanBeDressed(hero, things) {
  for (const thing of things) {
    if (!this.thingCanBeDressed(hero, thing)) return false;
  }

  return true;
}
