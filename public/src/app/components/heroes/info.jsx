var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:heroes:info');

var Parameters = require('./info/parameters.jsx');
var Information = require('./info/information.jsx');
var Modifiers = require('./info/modifiers.jsx');
var DamageProtection = require('./info/damage-protection.jsx');
var Skills = require('./info/skills.jsx');
var Abilities = require('./info/abilities.jsx');

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
