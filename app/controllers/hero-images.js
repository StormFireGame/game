var debug = require('debug')('game:controllers:hero-images');

var HeroImage = require('../models/hero-image');

exports.index = function *() {
  var hero = this.req.user;

  debug('getting %s', hero.sex);

  var heroImages = yield HeroImage
    .find({ sex: hero.sex })
    .exec();

  this.body = heroImages;
};
