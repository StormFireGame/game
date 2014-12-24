var EventEmitter = require('events').EventEmitter,
    _ = require('lodash');

var mediator = _.assign(new EventEmitter(), {
});

module.exports = mediator;
