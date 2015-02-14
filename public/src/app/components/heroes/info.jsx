var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:heroes:info');

var Parameters = require('./info/parameters');
var Information = require('./info/information');
var Modifiers = require('./info/modifiers');
var DamageProtection = require('./info/damage-protection');
var Skills = require('./info/skills');
var Abilities = require('./info/abilities');

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
