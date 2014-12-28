var React = require('react'),
    debug = require('debug')('game:pages:sessions:new'),

    HeroesNewForm = require('../../components/heroes/new.jsx');

var HeroesNewPage = React.createClass({
  render: function() {
    debug('render');
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
