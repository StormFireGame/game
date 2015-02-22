var React = require('react');
var debug = require('debug')('game:pages:hero:new');

var HeroNewForm = require('../../components/hero/new-form');

var HeroNewPage = React.createClass({
  render: function() {
    debug('render');

    return (
      <div className="middle">
        <div className="logo" />
        <h3>Signup</h3>
        <HeroNewForm />
      </div>
    );
  }
});

module.exports = HeroNewPage;
