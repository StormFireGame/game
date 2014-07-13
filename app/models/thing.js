var mongoose = require('mongoose');

var ThingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [
      'sword', 'axe', 'knive', 'clubs', 'shield',
      'helmet', 'kolchuga', 'armor',
      'belt', 'pants', 'treetop', 'glove',
      'boot', 'ring', 'amulet', 'potion', 'elixir'
    ],
    required: true
  },
  price: Number,
  isArt: {
    type: Boolean,
    default: false
  },
  stability: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },

  levelNeed: Number,

  strengthNeed: Number,
  dexterityNeed: Number,
  intuitionNeed: Number,
  healthNeed: Number,

  swordsNeed: Number,
  axesNeed: Number,
  knivesNeed: Number,
  clubsNeed: Number,
  shieldsNeed: Number,

  strengthGive: Number,
  dexterityGive: Number,
  intuitionGive: Number,
  healthGive: Number,

  swordsGive: Number,
  axesGive: Number,
  knivesGive: Number,
  clubsGive: Number,
  shieldsGive: Number,

  damageMin: Number,
  damageMax: Number,

  protectionHead: Number,
  protectionBreast: Number,
  protectionBelly: Number,
  protectionGroin: Number,
  protectionLegs: Number,

  accuracy: Number,
  dodge: Number,
  devastate: Number,
  durability: Number,

  blockBreak: Number,
  armorBreak: Number,

  hp: Number,

  strikeCount: Number,
  blockCount: Number,

  capacity: Number,
  isTwoHands: Boolean,
  timeDuration: Number
});

module.exports = mongoose.model('Thing', ThingSchema);
