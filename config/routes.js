var heroesController = require('../app/controllers/heroes');

module.exports = function(app) {

  app.post('/heroes', heroesController.create);

};
