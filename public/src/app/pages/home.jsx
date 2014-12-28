var React = require('react'),
    debug = require('debug')('game:pages:home'),

    SessionsNewForm = require('../components/sessions/new.jsx');

var HomePage = React.createClass({
  render: function() {
    debug('render');
    return (
      <div className="middle">
        <div className="logo" />
        <SessionsNewForm />
      </div>
    );
  }
});

module.exports = HomePage;
