var debug = require('debug')('game:heroController'),

    Hero = require('../models/hero');

exports.create = function *() {
  var body = this.request.body,
      hero;

  debug('hero create %s ...', body.login);

  try {
    hero = new Hero(body);
    hero = yield hero.save();
    debug('hero created');
  } catch(err) {
    if (err.name === 'ValidationError') {
      debug('hero validation errors');
      this.status = 422;
    } else {
      this.status = 500;
    }

    this.body = err;
    return;
  }

  this.status = 204;
};

exports.show = function() {
  this.body = 'Hero ' + this.req.user.login;
};
