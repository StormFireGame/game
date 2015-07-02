import React from 'react';
import { IconButton, FontIcon } from 'material-ui';

import debugLib from '../lib/debug';

const debug = debugLib('components:footer');

export default class Footer extends React.Component {
  getStyles() {
    return {
      base: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        height: 48,
        width: '100%',
        textAlign: 'center',
        background: '#212121'
      }
    };
  }
  render() {
    const styles = this.getStyles();

    debug('render');

    return (
      <footer style={styles.base}>
        <IconButton
          href="https://github.com/DragonLegend/game"
          linkButton={true}>
          <FontIcon
            color="white"
            className="icon-github"/>
        </IconButton>
      </footer>
    );
  }
}
