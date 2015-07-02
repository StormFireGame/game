import React from 'react';

import Menu from './menu';
import Info from './info';

import debugLib from '../lib/debug';

const debug = debugLib('components:header');

export default class Header extends React.Component {
  getStyles() {
    return {
      base: {
        height: 80
      }
    };
  }
  render() {
    debug('render');

    return (
      <header style={this.getStyles().base}>
        <Info />
        <Menu />
      </header>
    );
  }
}
