import React from 'react';
import { FontIcon } from 'material-ui';

import debugLib from '../../lib/debug';

const debug = debugLib('components:chat:participant');

export default class ChatParticipant extends React.Component {
  render() {
    debug('render');

    return (
      <div>
        <FontIcon
          style={{ fontSize: 15 }}
          className="mdfi_action_info" />
        {' '}
        [{this.props.level}] {this.props.login}
      </div>
    );
  }
}
