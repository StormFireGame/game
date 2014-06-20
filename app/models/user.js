var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
});

module.exports = mongoose.model('User', UserSchema);
