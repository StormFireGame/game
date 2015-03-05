var passport = require('koa-passport');

var oauth2 = require('./middlewares/oauth2');

var heroesController = require('../app/controllers/heroes');
var skillsController = require('../app/controllers/skills');
var heroImagesController = require('../app/controllers/hero-images');

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

  app.get('/skills',
    passport.authenticate('bearer', { session: false }),
    skillsController.index
  );

   app.get('/hero-images',
    passport.authenticate('bearer', { session: false }),
    heroImagesController.index
  );
};
