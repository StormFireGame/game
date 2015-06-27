import React from 'react';
import { Paper} from 'material-ui';

import mediator from '../../mediator';
import actionTypes from '../../constants/action-types';

import Message from './message.jsx';

import debugLib from '../../lib/debug';

const debug = debugLib('components:chat:messages');

export default class ChatMessages extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    mediator.socket.on('chat/message', this._onMessage);
    mediator.socket.on('chat/join', this._onJoin);
    mediator.socket.on('chat/leave', this._onLeave);
    mediator.on(actionTypes.CHAT_MESSAGE, this._onMessage);
  }
  componentWillUnmount() {
    mediator.socket.removeListener('chat/message', this._onMessage);
    mediator.socket.removeListener('chat/join', this._onJoin);
    mediator.socket.removeListener('chat/leave', this._onLeave);
    mediator.removeListener(actionTypes.CHAT_MESSAGE, this._onMessage);
  }
  _onJoin(participant) {
    this._addMessage({
      message: `${participant.login} joined`
    });
  }
  _onLeave(participant) {
    this._addMessage({
      message: `${participant.login} left`
    });
  }
  _onMessage(message) {
    this._addMessage(message);
  }
  _addMessage(message) {
    if (!message.datetime) {
      message.datetime = new Date().getTime();
    }

    this.setState({
      messages: this.state.messages.concat([message])
    });
  }
  render() {
    debug('render');

    const innerStyle = {
      height: '100%',
      overflow: 'auto',
      padding: 5
    };

    const messages = this.state.messages.map((message, index) => {
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
}
