var React = require('react');
var mui = require('material-ui');

var mediator = require('../../mediator');

var Participant = require('./participant.jsx');

var debug = require('debug')('game:components:chat:participants');

var Paper = mui.Paper;

var ChatParticipants = React.createClass({
  getInitialState: function() {
    return {
      participants: []
    };
  },
  componentDidMount: function() {
    mediator.socket.on('chat/join', this._onJoin);
    mediator.socket.on('chat/leave', this._onLeave);
    mediator.socket.on('chat/participants', this._onParticipants);
  },
  componentWillUnmount: function() {
    mediator.socket.removeListener('chat/join', this._onJoin);
    mediator.socket.removeListener('chat/leave', this._onLeave);
    mediator.socket.removeListener('chat/participants', this._onParticipants);
  },
  _onParticipants: function(participants) {
    this.setState({
      participants: participants
    });
  },
  _onJoin: function(participant) {
    this.setState({
      participants: this.state.participants.concat([participant])
    });
  },
  _onLeave: function(participant) {
    console.log(participant);
    this.setState({
      participants: this.state.participants
        .filter((item) => item._id !== participant._id)
    });
  },
  render: function() {
    debug('render');

    var style = {
      height: 100,
      overflow: 'auto',
      padding: 5,
      border: '1px solid blue'
    };

    var participants = this.state.participants.map((participant, index) => {
      return (
        <Participant
          key={index}
          login={participant.login}
          level={participant.level} />
      );
    });

    return (
      <Paper
        style={style}
        rounded={false}
        zDepth={0}>
        {participants}
      </Paper>
    );
  }
});

module.exports = ChatParticipants;
