import React from 'react';
import { Paper } from 'material-ui';

import mediator from '../../mediator';

import Participant from './participant.jsx';

import debugLib from '../../lib/debug';

const debug = debugLib('components:chat:participants');

export default class ChatParticipants extends React.Component {
  state = {
    participants: []
  };

  componentDidMount() {
    mediator.socket.on('chat/join', this._onJoin);
    mediator.socket.on('chat/leave', this._onLeave);
    mediator.socket.on('chat/participants', this._onParticipants);
  }
  componentWillUnmount() {
    mediator.socket.removeListener('chat/join', this._onJoin);
    mediator.socket.removeListener('chat/leave', this._onLeave);
    mediator.socket.removeListener('chat/participants', this._onParticipants);
  }
  _onParticipants(participants) {
    this.setState({
      participants: participants
    });
  }
  _onJoin(participant) {
    this.setState({
      participants: this.state.participants.concat([participant])
    });
  }
  _onLeave(participant) {
    this.setState({
      participants: this.state.participants
        .filter((item) => item._id !== participant._id)
    });
  }
  render() {
    debug('render');

    const style = {
      height: '100%',
      overflow: 'auto',
      padding: 5
    };

    const participants = this.state.participants.map((participant, index) => {
      return (
        <Participant
          key={index}
          login={participant.login}
          level={participant.level} />
      );
    });

    return (
      <Paper
        style={{
          height: '100%'
        }}
        innerStyle={style}
        rounded={false}>
        <div className="mui-font-style-subhead-1">
          {this.state.participants.length} participants
        </div>
        {participants}
      </Paper>
    );
  }
}
