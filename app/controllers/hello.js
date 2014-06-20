var User = require('../models/user');

exports.hello = function *() {
  this.body = 'Hello';
};
