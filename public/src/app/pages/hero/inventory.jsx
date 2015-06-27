import React from 'react';

import debugLib from '../../lib/debug';

import AuthMixin from '../mixins/auth';

import HeroBody from '../../components/hero/body';
import HeroInventory  from '../../components/hero/inventory';

const debug = debugLib('pages:hero:inventory');

export default class HeroInventoryPage extends React.Component {
  // mixins: [AuthMixin],
  render() {
    debug('render');

    return (
      <div id="hero-inventory" style={{
        display: 'flex',
        flexWrap: 'nowrap'
      }}>
        <div style={{
          flexBasis: 310,
          flexShrink: 0,
          flexGrow: 0
        }}>
          <HeroBody actions={true} />
        </div>
        <div style={{
          flexGrow: 1,
          flexShrink: 0,
          marginLeft: 20
        }}>
          <HeroInventory />
        </div>
      </div>
    );
  }
}
