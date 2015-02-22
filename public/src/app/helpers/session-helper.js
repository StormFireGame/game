var mediator = require('../mediator');

module.exports = {
  isSignin: function() {
    return mediator.accessToken !== null;
  }
};
