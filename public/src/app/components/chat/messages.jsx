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
    mediator.socket.on('chat/message', ::this.onMessage);
    mediator.socket.on('chat/join', ::this.onJoin);
    mediator.socket.on('chat/leave', ::this.onLeave);
    mediator.on(actionTypes.CHATMESSAGE, ::this.onMessage);
  }
  componentWillUnmount() {
    mediator.socket.removeListener('chat/message', ::this.onMessage);
    mediator.socket.removeListener('chat/join', ::this.onJoin);
    mediator.socket.removeListener('chat/leave', ::this.onLeave);
    mediator.removeListener(actionTypes.CHATMESSAGE, ::this.onMessage);
  }
  onJoin(participant) {
    this.addMessage({
      message: `${participant.login} joined`
    });
  }
  onLeave(participant) {
    this.addMessage({
      message: `${participant.login} left`
    });
  }
  onMessage(message) {
    this.addMessage(message);
  }

  getStyles() {
    return {
      base: {
        height: '100%'
      }
    };
  }

  render() {
    debug('render');

    const styles = this.getStyles();

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
        style={styles.base}
        rounded={false}>
        {messages}
      </Paper>
    );
  }

  addMessage(message) {
    if (!message.datetime) {
      message.datetime = new Date().getTime();
    }

    this.setState({
      messages: this.state.messages.concat([message])
    });
  }
}
