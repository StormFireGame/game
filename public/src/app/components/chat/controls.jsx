var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');

var mediator = require('../../mediator');
var actionTypes = require('../../constants/action-types');

var debug = require('debug')('game:components:chat:controls');

var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

var ChatControls = React.createClass({
  render: function() {
    debug('render');

    return (
      <div>
        <TextField
          ref="message"
          hintText="Your message..." />
        {' '}
        <RaisedButton
          primary={true}
          onClick={this._onSend}
          label="Send" />
      </div>
    );
  },
  _parseValue: function(value) {
    var command;
    var message;
    var tail;

    if (value[0] !== '[') {
      return {
        message: value
      };
    } else {
      [command, message] = value.split(']');
      command = command.substring(1);
      message = message.substring(1);
      [command, tail] = command.split(':');
      return {
        command: command,
        tail: tail,
        message: message
      };
    }
  },
  _onSend: function() {
    var message = this._parseValue(this.refs.message.getValue());
    message.datetime = new Date().getTime();
    message.from = _.pick(mediator.currentUser, '_id', 'login');

    mediator.socket.emit('chat/message', message);

    mediator.emit(actionTypes.CHAT_MESSAGE, message);

    this.refs.message.clearValue();
  }
});

module.exports = ChatControls;
