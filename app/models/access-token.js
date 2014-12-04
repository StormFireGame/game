var mongoose = require('mongoose');

var AccessTokenSchema = new mongoose.Schema({
  hero: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hero'
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client'
  },
  token: {
    type: String,
    unique: true,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AccessToken', AccessTokenSchema);
