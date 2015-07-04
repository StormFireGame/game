import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import _ from 'lodash';

import mediator from '../../mediator';
import actionTypes from '../../constants/action-types';

import debugLib from '../../lib/debug';

const debug = debugLib('components:chat:controls');

export default class ChatControls extends React.Component {
  render() {
    debug('render');

    return (
      <div>
        <TextField
          ref="message"
          hintText="Your message..." />
        {' '}
        <RaisedButton
          primary={true}
          onClick={::this.handleSend}
          label="Send" />
      </div>
    );
  }
  handleSend() {
    let message = this.parseValue(this.refs.message.getValue());
    message.datetime = new Date().getTime();
    message.from = _.pick(mediator.currentUser, 'id', 'login');

    mediator.socket.emit('chat/message', message);

    mediator.emit(actionTypes.CHATMESSAGE, message);

    this.refs.message.clearValue();
  }

  parseValue(value) {
    let command;
    let message;
    let tail;

    if (value[0] !== '[') {
      return {
        message: value
      };
    }

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
}
