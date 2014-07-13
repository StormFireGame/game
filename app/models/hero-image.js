var mongoose = require('mongoose');

var HeroImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    enum: ['female', 'male'],
    required: true
  },
  image: String
});

module.exports = mongoose.model('HeroImage', HeroImageSchema);
