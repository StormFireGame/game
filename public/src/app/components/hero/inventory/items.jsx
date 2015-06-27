import React from 'react';
import debugLib from '../../../lib/debug';

import Item from './item';

const debug = debugLib('components:hero:inventory:items');

export default class HeroInventoryItems extends React.Component {
  static propTypes = {
    things: React.PropTypes.array
  };

  render() {
    debug('render');

    return (
      <div className="items-wrapper">
        {this.props.things.map((thing, index) => {
          return (
            <Item
              key={index}
              thing={thing}
              hero={this.props.hero} />
          );
        })}
      </div>
    );
  }
}
