var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
    BearerStrategy = require('passport-http-bearer').Strategy,

    Client = require('../app/models/client'),
    AccessToken = require('../app/models/access-token');

module.exports = function(passport) {

  passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {
      Client.findOne({ clientId: clientId }).exec()
        .then(function(client) {
          if (!client) {
            return done(null, false);
          }
          if (client.clientSecret !== clientSecret) {
            return done(null, false);
          }
          done(null, client);
        }, done);
    }
  ));

  passport.use(new BearerStrategy(
    function(accessToken, done) {
      AccessToken.findOne({ token: accessToken }).populate('hero').exec()
        .then(function(token) {
          if (!token) {
            return done(null, false);
          }

          done(null, token.hero);
        }, done);
    }
));
};
