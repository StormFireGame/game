import React from 'react';
import {
  Toolbar,
  ToolbarGroup,
  RaisedButton,
  FontIcon,
  IconButton
} from 'material-ui';
import Router from 'react-router';

import debugLib from '../lib/debug';

const debug = debugLib('components:menu');

export default class Menu extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  };

  render() {
    debug('render');

    return (
      <nav id="menu">
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <RaisedButton
              label="Hero"
              linkButton={true}
              primary={this.isActive('/hero')}
              href="#/hero" />
            <RaisedButton
              linkButton={true}
              label="Inventory"
              primary={this.isActive('/hero/inventory')}
              href="#/hero/inventory" />
            <RaisedButton
              linkButton={true}
              label="Combats"
              primary={this.isActive('/hero/combats')}
              href="#/hero/combats" />
            <RaisedButton
              label="Preferences"
              linkButton={true}
              primary={
                this.isActive('/hero/preferences/general') ||
                this.isActive('/hero/preferences/security') ||
                this.isActive('/hero/preferences/images')
              }
              href="#/hero/preferences/general" />
            <RaisedButton
              linkButton={true}
              label="Info" />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <IconButton
              linkButton={true}
              href="#/island"
              tooltip="Move">
              <FontIcon className="mdfi_content_undo" />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
      </nav>
    );
  }
}
