import React, { Component } from 'react';

import HeroInfoParemeters from './info/Parameters';
import HeroInfoInformation from './info/Information';
import HeroInfoModifiers from './info/Modifiers';
import HeroInfoDamageProtection from './info/DamageProtection';
import HeroInfoSkills from './info/Skills';
import HeroInfoAbilities from './info/Abilities';

export default class extends Component {
  render() {
    return (
      <div className="uk-grid">
        <div className="uk-width-1-3">
          <HeroInfoParemeters />
          <HeroInfoInformation />
        </div>
        <div className="uk-width-1-3">
          <HeroInfoModifiers />
          <HeroInfoDamageProtection />
        </div>
        <div className="uk-width-1-3">
          <HeroInfoSkills />
          <HeroInfoAbilities />
        </div>
      </div>
    );
  }
}
