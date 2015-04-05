var mongoose = require('mongoose');
var config = require('../../config/application');

var IslandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: String,
  disabledCoordinates: []
}, {
  toJSON : {
    transform: function(doc, ret) {
      ret.image = config.staticUrl + config.uploadPaths.islands + ret.image;
    }
  }
});

module.exports = mongoose.model('Island', IslandSchema);
