var passport = require('koa-passport');

var oauth2 = require('./middlewares/oauth2');

var heroesController = require('../app/controllers/heroes');
var skillsController = require('../app/controllers/skills');
var heroImagesController = require('../app/controllers/hero-images');
var islandController = require('../app/controllers/islands');

module.exports = function(app) {
  app.post('/oauth/token', oauth2.token);

  app.post('/heroes', heroesController.create);

  app.get('/heroes/me',
    passport.authenticate('bearer', { session: false }),
    heroesController.show
  );

  app.put('/heroes/me/increase/:area(skills)/:id',
    passport.authenticate('bearer', { session: false }),
    heroesController.increase
  );

  app.put('/heroes/me/increase/:area(abilities|parameters)/:name',
    passport.authenticate('bearer', { session: false }),
    heroesController.increase
  );

  app.patch('/heroes/me',
    passport.authenticate('bearer', { session: false }),
    heroesController.update
  );

  app.put('/heroes/me/change-password',
    passport.authenticate('bearer', { session: false }),
    heroesController.changePassword
  );

  // TODO: Think about sep heroes controller to sep
  //   things, complects, island, building
  app.del('/heroes/me/things/:id',
    passport.authenticate('bearer', { session: false }),
    heroesController.removeThing
  );

  app.put('/heroes/me/things/:id/dress',
    passport.authenticate('bearer', { session: false }),
    heroesController.dressThing
  );

  app.put('/heroes/me/things/:id/undress',
    passport.authenticate('bearer', { session: false }),
    heroesController.undressThing
  );

  app.put('/heroes/me/things/undress',
    passport.authenticate('bearer', { session: false }),
    heroesController.undressThings
  );

  app.post('/heroes/me/complects',
    passport.authenticate('bearer', { session: false }),
    heroesController.createComplect
  );

  app.del('/heroes/me/complects/:id',
    passport.authenticate('bearer', { session: false }),
    heroesController.deleteComplect
  );

  app.put('/heroes/me/complects/:id/apply',
    passport.authenticate('bearer', { session: false }),
    heroesController.applyComplect
  );

  app.put('/heroes/me/island/move/:x/:y',
    passport.authenticate('bearer', { session: false }),
    heroesController.moveOnIsland
  );

  app.get('/island',
    passport.authenticate('bearer', { session: false }),
    islandController.show
  );

  app.get('/skills',
    passport.authenticate('bearer', { session: false }),
    skillsController.index
  );

  app.get('/hero-images',
    passport.authenticate('bearer', { session: false }),
    heroImagesController.index
  );
};
