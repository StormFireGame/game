import React from 'react';

import Body from '../hero/Body';
import Info from '../hero/Info';

export default () => (
  <div className="uk-grid">
    <div className="uk-width-4-10">
      <Body />
    </div>
    <div className="uk-width-6-10">
      <Info />
    </div>
  </div>
);
