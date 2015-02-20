var superagent = require('superagent');
var debug = require('debug')('game:lib:superagent');

var config = require('../config/application');
var environmentConfig = require('../config/environment');

var mediator = require('../mediator');

superagent.Request.prototype.promise = function() {
  return new Promise(function(resolve, reject) {
    var accessToken = mediator.accessToken || 'WKeTJTT9eV0hYs9fLzOL7rOIXTry8WKXRi8W9ag1AkK1JrUnnUQsuH9VDgbgWqbrI6gCglq1PnEUzcH3SHNobb4xL05MOUp1h5VVKiHR7Vsto0DHieVfiPTM5TidOwFHIAaSpreahXd7gO4lljUrDuZTdqceiAEjXkLkdljB3OaBga8RHN3qMVF1lbEnoAHvE195fXgHTILnNji8DR1OIBxL7pphpUKM3eYRX5WJ0Ns1nKA3pJQ0AkNgl5QdK8vZ';

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
        debug('response with error %o', res);
        return reject(res);
      }

      resolve(res.body);
    });
  }.bind(this));
};

module.exports = superagent;
