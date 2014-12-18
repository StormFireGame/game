var request = require('../lib/superagent');

var HeroesService = {
  new: function(data) {
    return request
      .post('/heroes')
      .send(data)
      .promise();
  }
};

module.exports = HeroesService;
