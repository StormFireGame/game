var React = require('react');
var debug = require('debug')('game:pages:home');

var SessionsNewForm = require('../components/sessions/new-form.jsx');

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
