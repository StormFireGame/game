var mongoose = require('mongoose');

var heroConfig = require('../../config/hero');

var BotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: Number,
    default: 0
  },
  image: String,

  feature: {
    strength: Number,
    dexterity: Number,
    intuition: Number,
    health: Number,

    swords: Number,
    axes: Number,
    knives: Number,
    clubs: Number,
    shields: Number,

    protectionHead: Number,
    protectionBreast: Number,
    protectionBelly: Number,
    protectionGroin: Number,
    protectionLegs: Number,

    damageMin: Number,
    damageMax: Number,

    accuracy: Number,
    dodge: Number,
    devastate: Number,
    durability: Number,

    blockBreak: Number,
    armorBreak: Number,

    hp: String,

    strikeCount: Number,
    blockCount: Number
  },

  location: String,
  hp: {
    type: Number,
    default: heroConfig.default.hp
  },

  // Parametrs
  strength: {
    type: Number,
    default: heroConfig.default.strength
  },
  dexterity: {
    type: Number,
    default: heroConfig.default.dexterity
  },
  intuition: {
    type: Number,
    default: heroConfig.default.intuition
  },
  health: {
    type: Number,
    default: heroConfig.default.health
  },

  // Abilities
  swords: {
    type: Number,
    default: heroConfig.default.swords
  },
  axes: {
    type: Number,
    default: heroConfig.default.axes
  },
  knives: {
    type: Number,
    default: heroConfig.default.knives
  },
  clubs: {
    type: Number,
    default: heroConfig.default.clubs
  },
  shields: {
    type: Number,
    default: heroConfig.default.shields
  },

  coordinateX1: Number,
  coordinateY1: Number,
  coordinateX2: Number,
  coordinateY2: Number,

  inCombat: Boolean,

  things: [{ type: mongoose.Schema.ObjectId, ref: 'Thing' }]
});

module.exports = mongoose.model('Bot', BotSchema);
