import React from 'react';
import { Menu, MenuItem } from 'material-ui';
import _ from 'lodash';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:preferences:menu');

export default class PreferencesMenu extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  };

  getStyles() {
    return {
      link: {
        textDecoration: 'none',
        color: 'black'
      }
    };
  }

  render() {
    const router = this.context.router;

    const menuItems = [{
      type: MenuItem.Types.LINK,
      text: 'General',
      payload: '#/hero/preferences/general',
      selected: router.isActive('/hero/preferences/general')
    }, {
      type: MenuItem.Types.LINK,
      text: 'Security',
      payload: '#/hero/preferences/security',
      selected: router.isActive('/hero/preferences/security')
    }, {
      type: MenuItem.Types.LINK,
      text: 'Images',
      payload: '#/hero/preferences/images',
      selected: router.isActive('/hero/preferences/images')
    }];

    debug('render');

    // FIXME: bug with selected
    return (
      <Menu
        menuItemStyleLink={this.getStyles().link}
        autoWidth={false}
        selectedIndex={_.findIndex(menuItems, 'selected')}
        menuItems={menuItems} />
    );
  }
}
