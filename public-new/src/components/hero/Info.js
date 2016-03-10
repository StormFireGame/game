import React from 'react';
import { connect } from 'react-redux';

import { heroIncreaseParameter } from '../../actions/AppActions';

import Paremeters from './info/Parameters';
import Information from './info/Information';
import Modifiers from './info/Modifiers';
import DamageProtection from './info/DamageProtection';
import Skills from './info/Skills';
import Abilities from './info/Abilities';

export default connect()(({ dispatch }) => (
  <div className="uk-grid">
    <div className="uk-width-1-3">
      <Paremeters
        onIncrease={(name) => {
          dispatch(heroIncreaseParameter(name));
        }} />
      <Information />
    </div>
    <div className="uk-width-1-3">
      <Modifiers />
      <DamageProtection />
    </div>
    <div className="uk-width-1-3">
      <Skills
        onIncrease={(name) => {
          dispatch(heroIncreaseParameter(name));
        }}/>
      <Abilities
        onIncrease={(name) => {
          dispatch(heroIncreaseParameter(name));
        }}/>
    </div>
  </div>
));
