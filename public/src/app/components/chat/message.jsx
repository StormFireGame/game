import React from 'react';
import moment from 'moment';

import debugLib from '../../lib/debug';

import mediator from '../../mediator';

const debug = debugLib('components:chat:message');

export default class ChatMessage extends React.Component {
  render() {
    debug('render');

    const props = this.props;
    let style = {};

    if (props.command) {
      props.message = `[${props.from.login}] to [${props.tail}] ${props.message}`;
      switch (props.command) {
        case 'to':
          if (props.from._id === mediator.currentUser._id ||
              props.tail === mediator.currentUser.login) {
            style.color = 'blue';
          }
          break;
        case 'private':
          style.color = 'red';
          break;
      }
    } else if (props.from) {
      props.message = `[${props.from.login}] ${props.message}`;
    }

    return (
      <div>
        [{moment(props.datetime).format('h:mm:ss')}]
        {' '}
        <span style={style}>{props.message}</span>
      </div>
    );
  }
}
