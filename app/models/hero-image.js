var mongoose = require('mongoose');
var config = require('../../config/application');

var HeroImageSchema = new mongoose.Schema({
  sex: {
    type: String,
    enum: ['female', 'male'],
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: function(doc, ret) {
      ret.image = config.staticUrl + config.uploadPaths.heroImages + ret.image;
    }
  }
});

module.exports = mongoose.model('HeroImage', HeroImageSchema);
