'use strict';

module.exports = {
  validationMapper: function(body) {
    var errors = {};

    for(let key in body.errors) {
      let error = body.errors[key];
      errors[key] = error.message;
    }

    return errors;
  }
};
