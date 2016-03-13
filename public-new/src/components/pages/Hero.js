import React from 'react';

import HeroBody from '../hero/Body';
import HeroInfo from '../hero/Info';

export default () => (
  <div className="uk-grid">
    <div className="uk-width-4-10">
      <HeroBody />
    </div>
    <div className="uk-width-6-10">
      <HeroInfo />
    </div>
  </div>
);
