import React from 'react';
import {
  Toolbar,
  ToolbarGroup,
  RaisedButton,
  FontIcon,
  IconButton
} from 'material-ui';

import debugLib from '../lib/debug';

const debug = debugLib('components:menu');

export default class Menu extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  };

  getStyles() {
    return {
      base: {
        float: 'right',
        width: 650
      },
      button: {
        marginLeft: 2,
        marginRight: 2
      }
    };
  }

  render() {
    const router = this.context.router;
    const styles = this.getStyles();

    debug('render');

    return (
      <nav style={styles.base}>
        <Toolbar>
          <ToolbarGroup
            key={0}
            float="left">
            <RaisedButton
              style={styles.button}
              label="Hero"
              linkButton={true}
              primary={router.isActive('/hero')}
              href="#/hero" />
            <RaisedButton
              style={styles.button}
              linkButton={true}
              label="Inventory"
              primary={router.isActive('/hero/inventory')}
              href="#/hero/inventory" />
            <RaisedButton
              style={styles.button}
              linkButton={true}
              label="Combats"
              primary={router.isActive('/hero/combats')}
              href="#/hero/combats" />
            <RaisedButton
              style={styles.button}
              label="Preferences"
              linkButton={true}
              primary={
                router.isActive('/hero/preferences/general') ||
                router.isActive('/hero/preferences/security') ||
                router.isActive('/hero/preferences/images')
              }
              href="#/hero/preferences/general" />
            <RaisedButton
              style={styles.button}
              linkButton={true}
              label="Info" />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <IconButton
              linkButton={true}
              href="#/island"
              tooltip="Move">
              <FontIcon className="mdficontentundo" />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
      </nav>
    );
  }
}
