var mongoose = require('mongoose');
var co = require('co');
var bcrypt = require('co-bcrypt');
var uniqueValidator = require('mongoose-unique-validator');
var deepPopulate = require('mongoose-deep-populate');

var heroConfig = require('../../config/hero');

var heroesHelper = require('../helpers/heroes');

var HeroThing = require('./hero-thing');
var Island = require('./island');

require('./hero-image');
require('./skill');
require('./island');
require('./building');

var HeroSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  },
  sex: {
    type: String,
    enum: ['female', 'male'],
    required: true
  },

  level: {
    type: Number,
    default: -1
  },
  experience: {
    type: Number,
    default: 0
  },
  money: {
    type: Number,
    default: heroConfig.default.money
  },
  moneyArt: {
    type: Number,
    default: heroConfig.default.moneyArt
  },

  hp: {
    type: Number,
    default: heroConfig.default.hp
  },
  capacity: {
    type: Number,
    default: heroConfig.default.capacity
  },

  location: {
    island: {
      type: mongoose.Schema.ObjectId,
      ref: 'Island'
    },
    coordinateX: Number,
    coordinateY: Number,
    building: {
      type: mongoose.Schema.ObjectId,
      ref: 'Building'
    }
  },

  numberOfWins: {
    type: Number,
    default: 0
  },
  numberOfLosses: {
    type: Number,
    default: 0
  },
  numberOfDraws: {
    type: Number,
    default: 0
  },

  numberOfParameters: {
    type: Number,
    default: 0
  },
  numberOfAbilities: {
    type: Number,
    default: 0
  },
  numberOfSkills: {
    type: Number,
    default: 0
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

    hp: {
      current: Number,
      max: Number,
      time: Date
    },
    capacity: {
      current: Number,
      max: Number
    },

    strikeCount: Number,
    blockCount: Number
  },

  image: {
    type: mongoose.Schema.ObjectId,
    ref: 'HeroImage'
  },
  things: [{
    type: mongoose.Schema.ObjectId,
    ref: 'HeroThing'
  }],
  skills: [{
    skill: {
      type: mongoose.Schema.ObjectId,
      ref: 'Skill'
    },
    level: Number
  }],
  complects: [{
    name: {
      type: String,
      required: true
    },
    things: [{
      type: mongoose.Schema.ObjectId,
      ref: 'HeroThing'
    }]
  }],

  // General info
  name: String,
  dateOfBirthday: Date,
  country: String,
  city: String,
  about: String,
  created: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
    }
  }
});

HeroSchema.plugin(uniqueValidator);
HeroSchema.plugin(deepPopulate);

HeroSchema.set('collection', 'heroes');

HeroSchema.pre('save', function(done) {
  var hero = this;
  var cryptPassword;
  var levelUp;

  cryptPassword = new Promise(function(resolve, reject) {
    if (this.isModified('password')) {
      co(function *() {
        var salt;
        var hash;

        try {
          salt = yield bcrypt.genSalt();
          hash = yield bcrypt.hash(hero.password, salt);
          hero.password = hash;
          resolve();
        } catch(err) {
          reject(err);
        }
      });
    } else {
      resolve();
    }
  }.bind(this));

  levelUp = new Promise(function(resolve, reject) {
    if (this.isModified('experience') || this.isNew) {
      co(function *() {
        try {
          yield heroesHelper.levelUp(hero);
          resolve();
        } catch(err) {
          reject(err);
        }
      });
    } else {
      resolve();
    }
  }.bind(this));

  Promise
    .all([cryptPassword, levelUp])
    .then(done, done);
});

HeroSchema.methods.comparePassword = function *(candidatePassword) {
  return yield bcrypt.compare(candidatePassword, this.password);
};

HeroSchema.statics.passwordMatches = function *(username, password) {
  var hero = yield this
    .findOne({ login: username })
    .exec();

  if (!hero) throw new Error('Hero not found');

  if (yield hero.comparePassword(password)) return hero;

  throw new Error('Password does not match');
};

HeroSchema.methods.removeThing = function *(id) {
  var hero = this;

  hero.things.remove(id);

  hero.complects.forEach((complect) => {
    if (complect.things.indexOf(id) !== -1) {
      hero.complects.remove(complect._id);
    }
  });

  yield hero.save();

  yield HeroThing
    .findByIdAndRemove(id)
    .exec();
};

HeroSchema.methods.getThing = function(id) {
  var hero = this;

  return hero.things.find((model) => model.id === id);
};

HeroSchema.methods.updateFeature = function *(notSave) {
  var hero = this;

  yield heroesHelper.updateFeature(hero);

  if (!notSave) yield hero.save();
};

HeroSchema.methods.setInitLocation = function *() {
  var hero = this;

  var island = yield Island
    .findOne()
    .exec();

  hero.location.island = island;
  hero.location.coordinateX = 27;
  hero.location.coordinateY = 33;
};

HeroSchema.methods.applyComplect = function *(id) {
  var hero = this;
  var complect = hero.complects.id(id);
  var complectThings;

  var dressedThingsIds = hero.things
    .filter(thing => thing.dressed)
    .map(thing => thing._id);

  yield HeroThing
    .update({ _id: { $in: dressedThingsIds } },
      { $set: { dressed: false } },
      { multi: true })
    .exec();

  yield HeroThing
    .update({ _id: { $in: complect.things }, dressed: false },
      { $set: { dressed: true } },
      { multi: true })
    .exec();

  complectThings = complect.things.map((thing) => thing.thing);

  if (!heroesHelper.thingsCanBeDressed(hero, complectThings)) {
    yield HeroThing
      .update({ _id: { $in: complect.things }, dressed: true },
        { $set: { dressed: false } },
        { multi: true })
      .exec();

    yield HeroThing
      .update({ _id: { $in: dressedThingsIds }, dressed: false },
        { $set: { dressed: true } },
        { multi: true })
      .exec();

    return false;
  }

  yield hero.updateFeature();

  return true;
};

module.exports = mongoose.model('Hero', HeroSchema);
