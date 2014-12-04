var oauth2orize = require('koa-oauth2orize'),
    passport = require('koa-passport'),
    compose = require('koa-compose'),
    co = require('co'),
    debug = require('debug')('game:oauth2'),

    utils = require('../../utils'),

    Hero = require('../../app/models/hero'),
    AccessToken = require('../../app/models/access-token');

var server = oauth2orize.createServer();

// TODO: implement refresh token
server.exchange(oauth2orize.exchange.password(
  function(client, username, password, scope, done) {
    debug('grant_type password client: %s username: %s', client.name, username);

    co(function *() {
      var hero,
          token,
          accessToken;

      try {
        hero = yield Hero.passwordMatches(username, password);
        debug('hero found %s', hero.login);

        yield AccessToken.remove({ client: client, hero: hero }).exec();

        debug('access token removed');

        token = utils.uid(256);

        accessToken = new AccessToken({
          token: token,
          hero: hero,
          client: client
        });
        yield accessToken.save();

        debug('access token: ', token);

        done(null, token);
      } catch(err) {
        return done(err);
      }
    });
  }
));

exports.token = compose([
  server.errorHandler(),
  passport.authenticate('oauth2-client-password', { session: false }),
  server.token()
]);
