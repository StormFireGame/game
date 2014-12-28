var React = require('react'),
    mui = require('material-ui'),
    _ = require('lodash'),
    debug = require('debug')('game:components:messages'),

    mediator = require('../mediator'),
    actionTypes = require('../constants/action-types'),

    Toast = mui.Toast;

var Messages = React.createClass({
  getInitialState: function() {
    return {
      message: null
    };
  },
  componentDidMount: function() {
    mediator.on(actionTypes.MESSAGE, this.setMessage);
  },
  componentWillUnmount: function() {
    mediator.removeListener(actionTypes.MESSAGE, this.setMessage);
  },
  setMessage: function(message) {
    debug('new message %s', message);
    // TODO: hack because transition do another render
    //   mediator render should be last
    _.delay(function() {
      this.setState({
        message: message
      });
    }.bind(this), 10);
  },
  render: function() {
    var message = this.state.message;

    this.state.message = null;

    debug('render');

    return (
      <Toast message={message} action="Close" open={!!message} />
    );
  }
});

module.exports = Messages;
