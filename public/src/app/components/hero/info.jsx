import React from 'react';
import _ from 'lodash';
import { ListDivider } from 'material-ui';

import debugLib from '../../lib/debug';

import HeroService from '../../services/hero-service';
import HeroApi from '../../utils/hero-api';
import HeroListenerMixin from './mixins/hero-listener';
import HeroStore from '../../stores/hero-store';

import Parameters from './info/parameters';
import Information from './info/information';
import Modifiers from './info/modifiers';
import DamageProtection from './info/damage-protection';
import Skills from './info/skills';
import Abilities from './info/abilities';

const debug = debugLib('components:hero:info');

function getHeroState() {
  return {
    hero: HeroStore.get()
  };
}

export default class HeroInfo extends React.Component {
  // mixins: [HeroListenerMixin],
  state = getHeroState();

  componentDidMount() {
    HeroStore.addChangeListener(::this._onChange);
  }
  componentWillUnmount() {
    HeroStore.removeChangeListener(::this._onChange);
  }
  _onChange() {
    this.setState(getHeroState());
  }

  getStyles() {
    return {
      group: {
        float: 'left',
        marginRight: 10
      }
    }
  }
  render() {
    const hero = this.state.hero;
    const styles = this.getStyles();

    if (_.isEmpty(hero)) return null;

    debug('render');

    return (
      <div>
        <div style={styles.group}>
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
            increaseHandler={::this._onIncrease} />
          <ListDivider />
          <Information
            numberOfWins={hero.numberOfWins}
            numberOfLosses={hero.numberOfLosses}
            numberOfDraws={hero.numberOfDraws}
            experience={hero.experience}
            nextLevelExperience={hero.nextLevelExperience} />
        </div>
        <div style={styles.group}>
          <Modifiers
            blockBreak={hero.feature.blockBreak}
            armorBreak={hero.feature.armorBreak}
            accuracy={hero.feature.accuracy}
            dodge={hero.feature.dodge}
            devastate={hero.feature.devastate}
            durability={hero.feature.durability} />
          <ListDivider />
          <DamageProtection
            damageMin={hero.feature.damageMin}
            damageMax={hero.feature.damageMax}
            protectionHead={hero.feature.protectionHead}
            protectionBreast={hero.feature.protectionBreast}
            protectionBelly={hero.feature.protectionBelly}
            protectionGroin={hero.feature.protectionGroin}
            protectionLegs={hero.feature.protectionLegs} />
        </div>
        <div style={styles.group}>
          <Skills
            skills={hero.skills}
            numberOfSkills={hero.numberOfSkills}
            increaseHandler={::this._onIncrease} />
          <ListDivider />
          <Abilities
            shields={hero.feature.shields}
            clubs={hero.feature.clubs}
            knives={hero.feature.knives}
            axes={hero.feature.axes}
            swords={hero.feature.swords}
            numberOfAbilities={hero.numberOfAbilities}
            increaseHandler={::this._onIncrease} />
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
