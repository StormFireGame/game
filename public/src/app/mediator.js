var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var mediator = assign(new EventEmitter(), {
  accessToken: window.localStorage.getItem('accessToken'),
  currentUser: null,
  socket: null
});

module.exports = mediator;
