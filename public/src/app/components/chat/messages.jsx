var React = require('react');
var mui = require('material-ui');

var mediator = require('../../mediator');
var actionTypes = require('../../constants/action-types');

var Message = require('./message.jsx');

var debug = require('debug')('game:components:chat:messages');

var Paper = mui.Paper;

var ChatMessages = React.createClass({
  getInitialState: function() {
    return {
      messages: []
    };
  },
  componentDidMount: function() {
    mediator.socket.on('chat/message', this._onMessage);
    mediator.socket.on('chat/join', this._onJoin);
    mediator.socket.on('chat/leave', this._onLeave);
    mediator.on(actionTypes.CHAT_MESSAGE, this._onMessage);
  },
  componentWillUnmount: function() {
    mediator.socket.removeListener('chat/message', this._onMessage);
    mediator.socket.removeListener('chat/join', this._onJoin);
    mediator.socket.removeListener('chat/leave', this._onLeave);
    mediator.removeListener(actionTypes.CHAT_MESSAGE, this._onMessage);
  },
  _onJoin: function(participant) {
    this._addMessage({
      message: `${participant.login} joined`
    });
  },
  _onLeave: function(participant) {
    this._addMessage({
      message: `${participant.login} left`
    });
  },
  _onMessage: function(message) {
    this._addMessage(message);
  },
  _addMessage: function(message) {
    if (!message.datetime) {
      message.datetime = new Date().getTime();
    }

    this.setState({
      messages: this.state.messages.concat([message])
    });
  },
  render: function() {
    debug('render');

    var innerStyle = {
      height: '100%',
      overflow: 'auto',
      padding: 5
    };

    var messages = this.state.messages.map((message, index) => {
      return (
        <Message
          key={index}
          from={message.from}
          command={message.command}
          tail={message.tail}
          datetime={message.datetime}
          message={message.message} />
      );
    });

    return (
      <Paper
        style={{
          height: '100%'
        }}
        innerStyle={innerStyle}
        rounded={false}>
        {messages}
      </Paper>
    );
  }
});

module.exports = ChatMessages;
