import React from 'react';
import _ from 'lodash';

import debugLib from '../../lib/debug';

import HeroService from '../../services/hero-service';
import HeroApi from '../../utils/hero-api';
import HeroListenerMixin from './mixins/hero-listener';

import Parameters from './info/parameters';
import Information from './info/information';
import Modifiers from './info/modifiers';
import DamageProtection from './info/damage-protection';
import Skills from './info/skills';
import Abilities from './info/abilities';

const debug = debugLib('components:hero:info');

export default class HeroInfo extends React.Component {
  // mixins: [HeroListenerMixin],
  render() {
    const hero = this.state.hero;

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
  }
  _onIncrease(area) {
    const idOrName = arguments[1];

    HeroService.increase(area, idOrName)
      .then(HeroApi.fetch);
  }
}
