var React = require('react');
var debug = require('debug')('game:pages:home');

var SessionNewForm = require('../components/session/new-form');

var HomePage = React.createClass({
  render: function() {
    debug('render');

    return (
      <div className="middle">
        <div className="logo" />
        <SessionNewForm />
      </div>
    );
  }
});

module.exports = HomePage;
