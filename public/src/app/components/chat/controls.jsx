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
          onClick={this._onSend}
          label="Send" />
      </div>
    );
  }
  _parseValue(value) {
    let command;
    let message;
    let tail;

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
  }
  _onSend() {
    let message = this._parseValue(this.refs.message.getValue());
    message.datetime = new Date().getTime();
    message.from = _.pick(mediator.currentUser, '_id', 'login');

    mediator.socket.emit('chat/message', message);

    mediator.emit(actionTypes.CHAT_MESSAGE, message);

    this.refs.message.clearValue();
  }
}
