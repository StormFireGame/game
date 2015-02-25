var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var mediator = assign(new EventEmitter(), {
  accessToken: 'PJvn04SH',
  currentHero: null
});

module.exports = mediator;
