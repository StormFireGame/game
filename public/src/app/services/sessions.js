var request = require('../lib/superagent'),
    store = require('store');

var SessionsService = {
  new: function(data) {
    var defer;

    data = {
      'grant_type': 'password',
      'client_id': 'test',
      'client_secret': 'test',
      username: data.login,
      password: data.password
    };

    defer = request
      .post('/oauth/token')
      .send(data)
      .promise();

    defer.then(function(res) {
        var accessToken = res['access_token'];

        if (accessToken) {
          store.set('accessToken', accessToken);
        }
      });

    return defer;
  }
};

module.exports = SessionsService;
