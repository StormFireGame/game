var superagent = require('superagent');
var debug = require('debug')('game:lib:superagent');

var config = require('../config/application');
var environmentConfig = require('../config/environment');

var mediator = require('../mediator');
var actionTypes = require('../constants/action-types');

superagent.Request.prototype.promise = function() {
  return new Promise(function(resolve, reject) {
    var accessToken = mediator.accessToken;

    if (accessToken) this.set('Authorization', 'Bearer ' + accessToken);

    if (this.method !== 'DELETE') this.accept('json');

    if (this.url.charAt(0) === '/') {
      this.url = environmentConfig[config.environment].api.root + this.url;
    }

    this.end(function(err, res) {
      if (err) {
        debug('error %o', err);
        return reject(err);
      }
      if (res.error) {
        debug('response with error %s %o', res.status, res);

        if (res.status === 401) {
          mediator.emit(actionTypes.UNAUTHORIZED);
        }

        return reject(res);
      }

      resolve(res.body);
    });
  }.bind(this));
};

module.exports = superagent;
