import React from 'react';

import debugLib from '../../lib/debug';

import HeroBody from '../../components/hero/body';
import HeroInventory from '../../components/hero/inventory';

import SessionHelper from '../../helpers/session-helper';
import HeroApi from '../../utils/hero-api';

const debug = debugLib('pages:hero:inventory');

function auth(target) {
  target.willTransitionTo = function(transition) {
    if (!SessionHelper.isSignin()) {
      transition.abort();
      debug('access closed %s', transition.path);
      transition.redirect('/');
    } else {
      HeroApi.fetch();
    }
  };
}

@auth
export default class HeroInventoryPage extends React.Component {

  getStyles() {
    return {
      base: {
        display: 'flex',
        flexWrap: 'nowrap'
      },
      body: {
        flexBasis: 310,
        flexShrink: 0,
        flexGrow: 0
      },
      content: {
        flexGrow: 1,
        flexShrink: 0,
        marginLeft: 20
      }
    };
  }

  render() {
    const styles = this.getStyles();

    debug('render');

    return (
      <div style={styles.base}>
        <div style={styles.body}>
          <HeroBody actions={true} />
        </div>
        <div style={styles.content}>
          <HeroInventory />
        </div>
      </div>
    );
  }
}
