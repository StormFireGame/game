import React from 'react';

import Paremeters from './info/Parameters';
import Information from './info/Information';
import Modifiers from './info/Modifiers';
import DamageProtection from './info/DamageProtection';
import Skills from './info/Skills';
import Abilities from './info/Abilities';

export default () => (
  <div className="uk-grid">
    <div className="uk-width-1-3">
      <Paremeters />
      <Information />
    </div>
    <div className="uk-width-1-3">
      <Modifiers />
      <DamageProtection />
    </div>
    <div className="uk-width-1-3">
      <Skills />
      <Abilities />
    </div>
  </div>
);
