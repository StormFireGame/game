var React = require('react');
var _ = require('lodash');

var debug = require('debug')('game:components:hero:info');

var HeroService = require('../../services/hero-service');
var HeroApi = require('../../utils/hero-api');
var HeroListenerMixin = require('./mixins/hero-listener');

var Parameters = require('./info/parameters');
var Information = require('./info/information');
var Modifiers = require('./info/modifiers');
var DamageProtection = require('./info/damage-protection');
var Skills = require('./info/skills');
var Abilities = require('./info/abilities');

var HeroInfo = React.createClass({
  mixins: [HeroListenerMixin],
  render: function() {
    var hero = this.state.hero;

    if (_.isEmpty(hero)) return null;

    debug('render');

    return (
      <div className="hero-info">
        <div className="group">
          <Parameters
            strength={hero.strength}
            featureStrength={hero.feature.strength}
            dexterity={hero.dexterity}
            featureDexterity={hero.feature.dexterity}
            intuition={hero.intuition}
            featureIntuition={hero.feature.intuition}
            health={hero.health}
            featureHealth={hero.feature.health}
            numberOfParameters={hero.numberOfParameters}
            increaseHandler={this._onIncrease} />
          <Information
            numberOfWins={hero.numberOfWins}
            numberOfLosses={hero.numberOfLosses}
            numberOfDraws={hero.numberOfDraws}
            experience={hero.experience}
            nextLevelExperience={hero.nextLevelExperience} />
        </div>
        <div className="group">
          <Modifiers
            blockBreak={hero.feature.blockBreak}
            armorBreak={hero.feature.armorBreak}
            accuracy={hero.feature.accuracy}
            dodge={hero.feature.dodge}
            devastate={hero.feature.devastate}
            durability={hero.feature.durability} />
          <DamageProtection
            damageMin={hero.feature.damageMin}
            damageMax={hero.feature.damageMax}
            protectionHead={hero.feature.protectionHead}
            protectionBreast={hero.feature.protectionBreast}
            protectionBelly={hero.feature.protectionBelly}
            protectionGroin={hero.feature.protectionGroin}
            protectionLegs={hero.feature.protectionLegs} />
        </div>
        <div className="group">
          <Skills
            skills={hero.skills}
            numberOfSkills={hero.numberOfSkills}
            increaseHandler={this._onIncrease} />
          <Abilities
            shields={hero.feature.shields}
            clubs={hero.feature.clubs}
            knives={hero.feature.knives}
            axes={hero.feature.axes}
            swords={hero.feature.swords}
            numberOfAbilities={hero.numberOfAbilities}
            increaseHandler={this._onIncrease} />
        </div>
      </div>
    );
  },
  _onIncrease: function(area) {
    var idOrName = arguments[1];

    HeroService.increase(area, idOrName)
      .then(HeroApi.fetch);
  }
});

module.exports = HeroInfo;
