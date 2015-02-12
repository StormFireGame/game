var React = require('react');
var debug = require('debug')('game:pages:heroes:new');

var HeroesNewForm = require('../../components/heroes/new-form.jsx');

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
