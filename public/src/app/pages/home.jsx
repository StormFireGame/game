'use strict';

var React = require('react'),

    SessionsNewForm = require('../components/sessions/new.jsx');

var HomePage = React.createClass({
  render: function() {
    return (
      <div className="middle">
        <div className="logo" />
        <SessionsNewForm />
      </div>
    );
  }
});

module.exports = HomePage;
