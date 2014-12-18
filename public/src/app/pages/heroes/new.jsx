'use strict';

var React = require('react'),

    HeroesNewForm = require('../../components/heroes/new.jsx');

var HeroesNewPage = React.createClass({
  render: function() {
    return (
      <div className="middle">
        <div className="logo" />
        <h3>Signup</h3>
        <HeroesNewForm />
      </div>
    );
  }
});

module.exports = HeroesNewPage;
