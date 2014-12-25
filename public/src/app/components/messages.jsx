'use strict';

var React = require('react'),
    mui = require('material-ui'),
    _ = require('lodash'),
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

    return (
      <Toast message={message} action="Close" open={!!message} />
    );
  }
});

module.exports = Messages;
