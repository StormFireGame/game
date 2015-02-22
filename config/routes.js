var passport = require('koa-passport');

var oauth2 = require('./middlewares/oauth2');

var heroesController = require('../app/controllers/heroes');
var skillsController = require('../app/controllers/skills');

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

  app.get('/skills',
    passport.authenticate('bearer', { session: false }),
    skillsController.index
  );
};
