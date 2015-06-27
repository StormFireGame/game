import React from 'react';
import { Menu } from 'material-ui';
import Router from 'react-router';
import _ from 'lodash';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:preferences:menu');

export default class PreferencesMenu extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  };

  render() {
    const menuItems = [{
      payload: '1',
      text: 'General',
      href: '#/hero/preferences/general',
      selected: this.isActive('/hero/preferences/general')
    }, {
      payload: '2',
      text: 'Security',
      href: '#/hero/preferences/security',
      selected: this.isActive('/hero/preferences/security')
    }, {
      payload: '3',
      text: 'Images',
      href: '#/hero/preferences/images',
      selected: this.isActive('/hero/preferences/images')
    }];
    const selectedIndex = _.findIndex(menuItems, 'selected');

    const style = {
      height: 160
    };

    debug('render');

    // TODO: fix menu height (pr)
    return (
      <div style={style}>
        <Menu
          autoWidth={false}
          selectedIndex={selectedIndex}
          onItemClick={this._onItemClick}
          menuItems={menuItems} />
      </div>
    );
  }
  _onItemClick(e, index, item) {
    // TODO: this is hack untill menuitem will support href
    document.location = item.href;
  }
}
