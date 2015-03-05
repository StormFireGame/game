var mongoose = require('mongoose');

var HeroImageSchema = new mongoose.Schema({
  sex: {
    type: String,
    enum: ['female', 'male'],
    required: true
  },
  image: String
}, {
  toJSON : {
    transform: function(doc, ret) {
      // TODO: think about move to config path
      ret.image = '/uploads/hero-images/' + ret.image;
    }
  }
});

module.exports = mongoose.model('HeroImage', HeroImageSchema);
