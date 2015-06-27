import React from 'react';
import _ from 'lodash';
import assign from 'object-assign';

import debugLib from '../../lib/debug';

import HeroListenerMixin from './mixins/hero-listener';

import Actions from './inventory/actions';
import Items from './inventory/items';

const debug = debugLib('components:hero:inventory');

export default class HeroInventory extends React.Component {
  // mixins: [HeroListenerMixin],
  state = assign({
    filter: null
  }, HeroListenerMixin.getInitialState);

  render() {
    const hero = this.state.hero;

    if (_.isEmpty(hero)) return null;

    const things = hero.things.filter((thing) => {
      const filter = this.state.filter;
      return !thing.dressed && (!filter || thing.thing.type === filter);
    });

    debug('render');

    return (
      <div>
        <Actions
          hero={hero}
          filterHandler={this._filterHandler} />
        <Items
          hero={hero}
          things={things} />
      </div>
    );
  }
  _filterHandler(type) {
    this.setState({
      filter: type
    });
  }
}
