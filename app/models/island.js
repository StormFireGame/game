var mongoose = require('mongoose');

var IslandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: String,
  parts: [{
    isMove: Boolean,
    coordinateX: Number,
    coordinateY: Number
  }]
});

module.exports = mongoose.model('Island', IslandSchema);
