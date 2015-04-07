'use strict';

var co = require('co');
var mongoose = require('mongoose');
var _ = require('lodash');

var debug = require('debug')('game:data');

var env = process.env.NODE_ENV || 'development';
var config = require('../config/environment')[env];

require('../config/mongoose')(config);

var HeroImage = require('../app/models/hero-image');
var Island = require('../app/models/island');
var Skill = require('../app/models/skill');
var TableExperience = require('../app/models/table-experience');
var Thing = require('../app/models/thing');
var Hero = require('../app/models/hero');
var HeroThing = require('../app/models/hero-thing');

var dataDefers = [
  { name: 'Hero images', model: HeroImage },
  { name: 'Islands', model: Island },
  { name: 'Skills', model: Skill },
  { name: 'Table experiences', model: TableExperience },
  { name: 'Things', model: Thing },
  { name: 'Hero things', model: HeroThing },
  { name: 'Heroes', model: Hero }
].map(function(item) {
  return new Promise(function(resolve) {
    co(function *() {
      debug(item.name + ' started');

      yield item.model.remove().exec();

      debug(item.name + ' removed');

      yield item.model.create(
        require('./bundles/' + _.kebabCase(item.name) + '.json'));

      debug(item.name + ' created');

      switch (item.name) {
      case 'Heroes':
        var heroes = yield Hero.find().exec();

        for (let hero of heroes) {
          yield hero.updateFeature();
        }

        debug('Heroes modified');
        break;
      }

      resolve();
    });
  });
});

Promise
  .all(dataDefers)
  .then(function() {
    mongoose.disconnect();
  });
