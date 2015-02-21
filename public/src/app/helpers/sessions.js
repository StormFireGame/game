var applicationConfig = require('../config/application');
var mediator = require('../mediator');

module.exports = {
  checkRouteAccessWithoutAuth: function(path) {
    return applicationConfig.allowedRoutesWithoutAuth.indexOf(path) !== -1;
  },
  isSignin: function() {
    return mediator.accessToken !== null;
  }
};
