import React from 'react';
import { FontIcon } from 'material-ui';

import debugLib from '../../lib/debug';

const debug = debugLib('components:chat:participant');

export default class ChatParticipant extends React.Component {
  render() {
    const props = this.props;

    debug('render');

    return (
      <div>
        <FontIcon
          style={{ fontSize: 15 }}
          className="mdfiactioninfo" />
        {' '}
        [{props.level}] {props.login}
      </div>
    );
  }
}
