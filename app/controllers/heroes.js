var parse = require('co-body'),

    Hero = require('../models/hero');

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
    return;
  }

  this.status = 204;
};

exports.show = function *() {
  this.body = 'Hero ' + this.req.user.login;
};
