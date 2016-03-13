import React from 'react';
import Menu from '../../PreferenceMenu';

export default ({ children }) => (
  <div className="uk-grid">
    <div className="uk-width-3-10">
      <Menu />
    </div>
    <div className="uk-width-6-10 uk-push-1-10">
      {children}
    </div>
  </div>
);
