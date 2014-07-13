var mongoose = require('mongoose'),

    heroConfig = require('../../config/hero');

var SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  features: [{
    name: {
      type: String,
      enum: heroConfig.features,
      required: true
    },
    plus: Number
  }]
});

module.exports = mongoose.model('Skill', SkillSchema);
