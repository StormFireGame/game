var request = require('../lib/superagent');

var SessionsService = {
  new: function(data) {
    return request
      .post('/oauth/token')
      .send(data);
  }
};

module.exports = SessionsService;
