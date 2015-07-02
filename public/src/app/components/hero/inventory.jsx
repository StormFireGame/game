import React from 'react';
import _ from 'lodash';
import assign from 'object-assign';

import debugLib from '../../lib/debug';

import HeroStore from '../../stores/hero-store';

import Actions from './inventory/actions';
import Items from './inventory/items';

const debug = debugLib('components:hero:inventory');

function getHeroState() {
  return {
    hero: HeroStore.get()
  };
}

export default class HeroInventory extends React.Component {
  // mixins: [HeroListenerMixin],
  state = assign({
    filter: null
  }, getHeroState());

  componentDidMount() {
    HeroStore.addChangeListener(::this._onChange);
  }
  componentWillUnmount() {
    HeroStore.removeChangeListener(::this._onChange);
  }
  _onChange() {
    this.setState(getHeroState());
  }

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
          filterHandler={::this._filterHandler} />
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
