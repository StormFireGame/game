import React from 'react';
import { IconButton } from 'material-ui';

import debugLib from '../lib/debug';

const debug = debugLib('components:footer');

export default class Footer extends React.Component {
  render() {
    debug('render');

    return (
      <footer id="footer">
        <IconButton
          iconClassName="icon-github"
          href="https://github.com/DragonLegend/game"
          linkButton={true} />
      </footer>
    );
  }
}
