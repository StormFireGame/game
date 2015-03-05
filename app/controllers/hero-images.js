var debug = require('debug')('game:controllers:hero-images');

var HeroImage = require('../models/hero-image');

exports.index = function *() {
  var hero = this.req.user;
  var heroImages;
  var heroImagesObj = [];
  // TODO: think about move to helper or utils
  var absoluteUrl = this.request.protocol + '://' + this.request.get('host');

  debug('fetching hero images %s', hero.sex);

  try {
    heroImages = yield HeroImage.find({ sex: hero.sex }).exec();
  } catch(err) {
    this.status = 500;
    this.body = err;
    return;
  }

  heroImages.forEach(function(heroImage) {
    var heroImageObj = heroImage.toJSON();
    heroImageObj.image = absoluteUrl + heroImageObj.image;
    heroImagesObj.push(heroImageObj);
  }.bind(this));

  this.body = heroImagesObj;
};
