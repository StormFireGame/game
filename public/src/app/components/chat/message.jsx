var React = require('react');
var moment = require('moment');

var debug = require('debug')('game:components:chat:message');

var mediator = require('../../mediator');

var ChatMessage = React.createClass({
  render: function() {
    debug('render');

    var props = this.props;
    var style = {};

    if (props.command) {
      props.message = `${props.from.login} to [${props.tail}] ${props.message}`;
      switch(props.command) {
        case 'to':
          if (props.from._id === mediator.currentUser._id ||
              props.tail === mediator.currentUser.login) {
            style.color = 'blue';
          }
          break;
        case 'private':
          style.color = 'red';
          break;
      }
    } else if (props.from) {
      props.message = `${props.from.login}: ${props.message}`;
    }

    return (
      <div>
        [{moment(props.datetime).format('h:mm:ss')}]
        {' '}
        <span style={style}>{props.message}</span>
      </div>
    );
  }
});

module.exports = ChatMessage;
