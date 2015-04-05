var debug = require('debug')('game:controllers:islands');

var Island = require('../models/island');

exports.show = function *() {
  var hero = this.req.user;

  debug('getting');

  var island = yield Island
    .findById(hero.location.island)
    .exec();

  this.body = island;
};
