var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:chat:participant');

var FontIcon = mui.FontIcon;

var ChatParticipant = React.createClass({
  render: function() {
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
});

module.exports = ChatParticipant;
