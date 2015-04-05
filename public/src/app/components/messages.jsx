var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');
var debug = require('debug')('game:components:messages');

var mediator = require('../mediator');
var actionTypes = require('../constants/action-types');

var Snackbar = mui.Snackbar;

var Messages = React.createClass({
  getInitialState: function() {
    return {
      message: null
    };
  },
  componentDidMount: function() {
    mediator.on(actionTypes.MESSAGE, this._setMessage);
  },
  componentWillUnmount: function() {
    mediator.removeListener(actionTypes.MESSAGE, this._setMessage);
  },
  _setMessage: function(message) {
    debug('new message %s', message);
    // TODO hack because transition do another render
    //   mediator render should be last
    _.delay(function() {
      this.setState({
        message: message
      });

      this.refs.message.dismiss();
      this.refs.message.show();
    }.bind(this), 20);
  },
  render: function() {
    var message = this.state.message;

    if (!message) return null;

    this.state.message = null;

    debug('render');

    return (
      <Snackbar
        ref="message"
        message={message}
        action="Close"
        onActionTouchTap={this._onClose} />
    );
  },
  _onClose: function() {
    this.refs.message.dismiss();
  }
});

module.exports = Messages;
