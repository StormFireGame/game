import React from 'react';

import Body from '../hero/Body';
import Inventory from '../hero/Inventory';

export default () => (
  <div className="uk-grid">
    <div className="uk-width-4-10">
      <Body actions />
    </div>
    <div className="uk-width-6-10">
      <Inventory />
    </div>
  </div>
);
