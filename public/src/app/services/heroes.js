var request = require('../lib/superagent');
var debug = require('debug')('game:services:heroes');
var mediator = require('../mediator');

var HeroesService = {
  new: function(data) {
    var defer;

    debug('new request %o', data);

    defer = request
      .post('/heroes')
      .send(data)
      .promise();

    defer
      .then(function() {
        debug('created');
      });

    return defer;
  },

  fetch: function() {
    var accessToken = mediator.accessToken || 'PuHQvRe5VhBw4ikgBuY7rK9ZiYdcXXJfhIDgeWBrJiBpsgC5ywaZLmHsk5NfM1BGLftvJ6fLLBUvUelS7LlZpXW9W7mkiYxdEEecESvbsdqY3mbpa3l3Dr43tgL5OBTxuDxMhYa54s3qYIP1TEjqWmyRuucYWmAlsjNbt5QXiHmUAgA9uGxIQwe0O4sPl6OecG0KeJ23ccueihlSyr5d7PbFwpRYpwH1O8OSQVRkj9TFBb8A0oQuRnYcFGbUA6Yo';
    var defer;

    debug('fetching request');

    defer = request
      .get('/heroes/me')
      .set('Authorization', 'Bearer ' + accessToken)
      .promise();

    defer
      .then(function(response) {
        debug('fetched');
        mediator.currentHero = response;
      });

    return defer;
  }
};

module.exports = HeroesService;
