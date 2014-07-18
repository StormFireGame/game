var Hero = require('../models/hero'),

    parse = require('co-body');

exports.create = function *() {
  var body = yield parse.json(this),
      hero;

  try {
    hero = new Hero(body);
    hero = yield hero.save();
  } catch(err) {
    if (err.name === 'ValidationError') {
      this.status = 422;
    } else {
      this.status = 500;
    }

    this.body = err;
  }

  this.status = 204;
};
