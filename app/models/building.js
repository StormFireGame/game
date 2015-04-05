var mongoose = require('mongoose');

require('./island');

var BuildingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: String,
  island: {
    type: mongoose.Schema.ObjectId,
    ref: 'Island'
  },

  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building'
  },
  // defaultChild: Boolean,

  module: String,

  coordinateX1: Number,
  coordinateY1: Number,
  coordinateX2: Number,
  coordinateY2: Number
});

module.exports = mongoose.model('Building', BuildingSchema);
