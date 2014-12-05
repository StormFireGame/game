var mongoose = require('mongoose');

require('./hero');
require('./bot');

var CombatSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['duel', 'group', 'chaotic'],
    required: true
  },
  location: String,
  status: {
    type: String,
    enum: ['wait', 'fight', 'after', 'past'],
    default: 'wait'
  },
  timeOut: {
    type: Number,
    enum: [60, 120, 180],
    required: true
  },
  timeWait: {
    type: Number,
    enum: [300, 600, 1200],
    required: true
  },
  injury: {
    type: String,
    enum: ['low', 'middle', 'top'],
    require: true
  },
  withThings: {
    type: Boolean,
    required: true
  },
  firstTeamCount: Number,
  secondTeamCount: Number,
  firstTeamLevelMin: Number,
  firstTeamLevelMax: Number,
  secondTeamLevelMin: Number,
  secondTeamLevelMax: Number,
  startDateTime: {
    type: Date,
    default: Date.now
  },
  finishDateTime: {
    type: Date
  },
  winTeam: Number,
  warriors: [{
    hero: {
      type: mongoose.Schema.ObjectId,
      ref: 'Hero'
    },
    bot: {
      type: mongoose.Schema.ObjectId,
      ref: 'Bot'
    },
    team: {
      type: Number,
      required: true
    },
    isDead: Boolean,
    isJoin: Boolean,
    isOut: Boolean,
    isQuit: Boolean
  }],
  logs: [{
    firstHero: {
      type: mongoose.Schema.ObjectId,
      ref: 'Hero'
    },
    secondHero: {
      type: mongoose.Schema.ObjectId,
      ref: 'Hero'
    },
    firstBot: {
      type: mongoose.Schema.ObjectId,
      ref: 'Bot'
    },
    secondBot: {
      type: mongoose.Schema.ObjectId,
      ref: 'Bot'
    },
    firstWarriorStrike: String,
    secondWarriorStrike: String,
    firstWarriorBlock: String,
    secondWarriorBlock: String,
    firstWarriorDamage: Number,
    secondWarriorDamage: Number,
    firstWarriorExperience: Number,
    secondWarriorExprience: Number,
    isJoin: Boolean,
    isOut: Boolean,
    isDead: Boolean,
    text: String,
    isPast: Boolean,
    hpPlus: Number,
    dateTime: {
      type: Date,
      default: Date.now
    }
  }]
});

module.exports = mongoose.model('Combat', CombatSchema);
