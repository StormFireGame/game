var React = require('react');

var Messages = require('./messages');
var Participants = require('./participants');
var Controls = require('./controls');

var debug = require('debug')('game:components:chat');

var Chat = React.createClass({
  render: function() {
    debug('render');

    return (
      <div>
        <Messages />
        <Participants />
        <Controls />
      </div>
    );
  },
  _onMessage: function() {

  }
});

module.exports = Chat;
