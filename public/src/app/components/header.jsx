import React from 'react';

import Menu from './menu';
import Info from './info';

import debugLib from '../lib/debug';

const debug = debugLib('components:header');

export default class Header extends React.Component {
  render() {
    debug('render');

    return (
      <header id="header">
        <Info />
        <Menu />
      </header>
    );
  }
}
