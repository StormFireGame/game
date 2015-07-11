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
    mediator.socket.on('chat/join', ::this.onJoin);
    mediator.socket.on('chat/leave', ::this.onLeave);
    mediator.socket.on('chat/participants', ::this.onParticipants);
  }
  componentWillUnmount() {
    mediator.socket.removeListener('chat/join', ::this.onJoin);
    mediator.socket.removeListener('chat/leave', ::this.onLeave);
    mediator.socket.removeListener('chat/participants', ::this.onParticipants);
  }
  onParticipants(participants) {
    this.setState({
      participants: participants
    });
  }
  onJoin(participant) {
    this.setState({
      participants: this.state.participants.concat([participant])
    });
  }
  onLeave(participant) {
    this.setState({
      participants: this.state.participants
        .filter((item) => item._id !== participant._id)
    });
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
        style={styles.base}
        rounded={false}>
        <h3>
          {this.state.participants.length} participants
        </h3>
        {participants}
      </Paper>
    );
  }
}
