var helloController = require('../app/controllers/hello');

module.exports = function(app) {

  app.get('/', helloController.hello);

};
