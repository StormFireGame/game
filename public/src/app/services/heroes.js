var request = require('../lib/superagent');
var debug = require('debug')('game:services:heroes');

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
  }
};

module.exports = HeroesService;
