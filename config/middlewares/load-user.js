var AccessToken = require('../../app/models/access-token');
var debug = require('debug')('game:middlewares:load-user');

module.exports = function *(accessToken) {
  var token = yield AccessToken
    .findOne({ token: accessToken })
    .populate('hero')
    .exec();

  if (!token) {
    debug('token not found');
    return;
  }

  return token.hero;
};
