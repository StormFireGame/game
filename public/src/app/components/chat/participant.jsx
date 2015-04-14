var React = require('react');

var debug = require('debug')('game:components:chat:participant');

var ChatParticipant = React.createClass({
  render: function() {
    debug('render');

    return (
      <div>
        [{this.props.level}] {this.props.login}
      </div>
    );
  }
});

module.exports = ChatParticipant;
