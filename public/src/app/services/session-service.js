var fetch = require('../lib/fetch');
var store = require('store');
var debug = require('debug')('game:services:session');
var mediator = require('../mediator');

module.exports = {
  new: function(data) {
    data = {
      'grant_type': 'password',
      'client_id': 'test',
      'client_secret': 'test',
      username: data.login,
      password: data.password
    };

    debug('new request %o', data);
    return fetch('/oauth/token', {
      method: 'POST',
      body: data
    }).then(function(response) {
        var accessToken = response.access_token;

        if (accessToken) {
          store.set('accessToken', accessToken);
          debug('get access token %s', accessToken);

          mediator.accessToken = accessToken;
        }
      });
  }
};
