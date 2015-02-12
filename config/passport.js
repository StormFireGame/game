var debug = require('debug')('game:passport');

var ClientPasswordStrategy =
      require('passport-oauth2-client-password').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var Client = require('../app/models/client');
var AccessToken = require('../app/models/access-token');

module.exports = function(passport) {

  passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {
      debug('client passport strategy clientId: %s clientSecret: %s',
        clientId, clientSecret);

      Client.findOne({ clientId: clientId }).exec()
        .then(function(client) {
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

      AccessToken.findOne({ token: accessToken }).populate('hero').exec()
        .then(function(token) {
          if (!token) {
            debug('token not found');
            return done(null, false);
          }

          debug('hero provided');
          done(null, token.hero);
        }, done);
    }
));
};
