var React = require('react'),
    mui = require('material-ui'),

    debug = require('debug')('game:components:heroes:info'),

    Parameters = require('./info/parameters.jsx'),
    Information = require('./info/information.jsx'),
    Modifiers = require('./info/modifiers.jsx'),
    DamageProtection = require('./info/damage-protection.jsx'),
    Skills = require('./info/skills.jsx'),
    Abilities = require('./info/abilities.jsx');

var HeroesInfo = React.createClass({
  render: function() {
    debug('render');

    return (
      <div className="hero-info">
        <div className="group">
          <Parameters />
          <Information />
        </div>
        <div className="group">
          <Modifiers />
          <DamageProtection />
        </div>
        <div className="group">
          <Skills />
          <Abilities />
        </div>
      </div>
    );
  }
});

module.exports = HeroesInfo;
