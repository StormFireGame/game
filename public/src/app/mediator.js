var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var mediator = _.assign(new EventEmitter(), {
});

module.exports = mediator;
