'use strict';

var React = require('react'),
    mui = require('material-ui'),
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
    this.setState({
      message: message
    });
  },
  render: function() {
    return (
      <Toast message={this.state.message} action="Close" open={this.state.message} />
    );
  }
});

module.exports = Messages;
