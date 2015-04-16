var debug = require('debug')('game:passport');

var co = require('co');
var ClientPasswordStrategy =
      require('passport-oauth2-client-password').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var Client = require('../app/models/client');
var loadUser = require('./middlewares/load-user');

module.exports = function(passport) {

  passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {
      debug('client passport strategy clientId: %s clientSecret: %s',
        clientId, clientSecret);

      Client
        .findOne({ clientId: clientId })
        .exec()
        .then((client) => {
          if (!client) {
            debug('client not found');
            return done(null, false);
          }

          if (client.clientSecret !== clientSecret) {
            debug('wrong client secret');
            return done(null, false);
          }

          debug('client provided');
          done(null, client);
        }, done);
    }
  ));

  passport.use(new BearerStrategy(
    function(accessToken, done) {
      debug('bearer strategy accessToken: %s', accessToken);

      co(function *() {
        var user = yield loadUser(accessToken);

        if (!user) {
          return done(null, false);
        }

        if (user) {
          debug('user provided');
          done(null, user);
        }
      });
    }
));
};
