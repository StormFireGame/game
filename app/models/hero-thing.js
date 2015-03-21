var mongoose = require('mongoose');

var heroConfig = require('../../config/hero');

require('./thing');

var HeroThingSchema = new mongoose.Schema({
  thing: {
    type: mongoose.Schema.ObjectId,
    ref: 'Thing'
  },
  stabilityAll: Number,
  stabilityLeft: Number,
  dressed: Boolean,
  away: Boolean,
  features: [{
    name: {
      type: String,
      enum: heroConfig.features,
      required: true
    },
    plus: Number
  }]
});

HeroThingSchema.pre('save', function(done) {
  var hero;

  if (this.isModified('dressed')) {
    // TODO update features
  }

  done();
});

module.exports = mongoose.model('HeroThing', HeroThingSchema);
