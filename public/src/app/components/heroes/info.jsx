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
    var hero = this.props.hero;

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
          />
          <Information
            numberOfWins={hero.numberOfWins}
            numberOfLosses={hero.numberOfLosses}
            numberOfDraws={hero.numberOfDraws}
            experience={hero.experience}
            nextLevelExperience={hero.nextLevelExperience}
           />
        </div>
        <div className="group">
          <Modifiers
            blockBreak={hero.feature.blockBreak}
            armorBreak={hero.feature.armorBreak}
            accuracy={hero.feature.accuracy}
            dodge={hero.feature.dodge}
            devastate={hero.feature.devastate}
            durability={hero.feature.durability}
          />
          <DamageProtection
            damageMin={hero.feature.damageMin}
            damageMax={hero.feature.damageMax}
            protectionHead={hero.feature.protectionHead}
            protectionBreast={hero.feature.protectionBreast}
            protectionBelly={hero.feature.protectionBelly}
            protectionGroin={hero.feature.protectionGroin}
            protectionLegs={hero.feature.protectionLegs}
          />
        </div>
        <div className="group">
          <Skills
            skills={hero.skills}
            numberOfSkills={hero.numberOfSkills}
          />
          <Abilities
            shields={hero.feature.shields}
            clubs={hero.feature.clubs}
            knives={hero.feature.knives}
            axes={hero.feature.axes}
            swords={hero.feature.swords}
            numberOfAbilities={hero.numberOfAbilities}
          />
        </div>
      </div>
    );
  }
});

module.exports = HeroesInfo;
