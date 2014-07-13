var mongoose = require('mongoose');

var TableExperienceSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
    unique: true
  },
  experience: {
    type: Number,
    required: true,
    unique: true
  },
  coefficient: {
    type: Number,
    required: true
  },
  numberOfParameters: Number,
  numberOfAbilities: Number,
  numberOfSkills: Number,
  money: Number
});

module.exports = mongoose.model('TableExperience', TableExperienceSchema);
