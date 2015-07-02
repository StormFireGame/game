import React from 'react';
import { Paper } from 'material-ui';
import _ from 'lodash';
import assign from 'object-assign';

import debugLib from '../../lib/debug';

import HeroListenerMixin from './mixins/hero-listener';

import ThingSlot from './body/thing-slot';
import ImageSlot from './body/image-slot';

import HeroApi from '../../utils/hero-api';

import HeroStore from '../../stores/hero-store';

const debug = debugLib('components:hero:body');

function getHeroState() {
  return {
    hero: HeroStore.get()
  };
}

export default class HeroBody extends React.Component {
  // mixins: [HeroListenerMixin],
  static propTypes = {
    actions: React.PropTypes.bool
  };

  state = getHeroState();

  componentDidMount() {
    HeroStore.addChangeListener(::this._onChange);
  }
  componentWillUnmount() {
    HeroStore.removeChangeListener(::this._onChange);
  }
  _onChange() {
    this.setState(getHeroState());
  }

  getStyles() {
    const offset = 6;
    const width = 70;

    return {
      base: {
        position: 'relative',
        width: 310,
        height: 390
      }
    }
  }

  getThingPositions() {
    const offset = 6;
    const width = 70;
    const height = 75;
    const pullRigth = (3 * width) + (4 * offset);
    let fullHeight;

    let position = {
      gloves: {
        left: offset,
        top: offset
      },
      helmet: {
        left: width + 2 * offset,
        top: offset
      },
      amulet: {
        left: 2 * width + 3 * offset,
        top: offset
      },
      treetops: {
        left: pullRigth,
        top: offset
      },
      arms: {
        height: 85,
        left: offset,
        top: height + 2 * offset
      },
      shield: {
        height: 85,
        left: pullRigth,
        top: height + (2 * offset)
      }
    };

    position.armor = {
      height: 90,
      left: offset,
      top: position.arms.top + position.arms.height + offset
    }

    position.pants = {
      height: 110,
      left: offset,
      top: position.armor.top + position.armor.height + offset
    };

    fullHeight = height + position.arms.height + position.armor.height +
      position.pants.height + 5 * offset;

    position.elixir = {};
    let elixir = position.elixir;
    elixir.height = 32;
    elixir.width = elixir.height;
    elixir.left = width + (2 * offset);
    elixir.top = fullHeight - elixir.height - offset;

    position.elixir1 = {
      left: elixir.left + offset + elixir.width,
      top: elixir.top
    };
    position.elixir2 = {
      left: elixir.left + offset * 2 + elixir.width * 2,
      top: elixir.top
    };
    position.elixir3 = {
      left: elixir.left + 3 * offset + 3 * elixir.width,
      top: elixir.top
    };

    position.ring = {};
    let ring = position.ring;
    ring.height = 32;
    ring.width = ring.height;
    ring.left = pullRigth;
    ring.top = position.shield.top + position.shield.height + offset;

    position.ring1 = {
      left: ring.left + offset + ring.width,
      top: ring.top
    };
    position.ring2 = {
      left: ring.left,
      top: ring.top + offset + ring.height
    };
    position.ring3 = {
      left: ring.left + offset + ring.width,
      top: ring.top + offset + ring.height
    };

    position.belt = {
      height: 50,
      left: pullRigth,
      top: position.ring.top + 2 * position.ring.height + 2 * offset
    };

    position.boots = {
      left: pullRigth,
      top: position.belt.top + position.belt.height + offset
    };

    position.base = {
      position: 'relative',
      width: (width * 4) + (offset * 5),
      height: fullHeight
    };

    position.image = {
      left: width + 2 * offset,
      top: height + 2 * offset,
      width: 146,
      height: 259
    };

    return position;
  }

  render() {
    const hero = this.state.hero;

    if (_.isEmpty(hero)) return null;

    let things = hero.things.filter(thing => thing.dressed);
    const position = this.getThingPositions();
    const styles = this.getStyles();

    function getThing(type) {
      return _.find(things, (thing) => {
        return thing.thing.type === type;
      });
    };

    debug('render');

    const thingsSlots = [
      'gloves', 'helmet', 'amulet', 'treetops',
      'arms', 'armor', 'shield', 'pants', 'belt', 'boots',
      'ring', 'ring1', 'ring2', 'ring3',
      'elixir', 'elixir1', 'elixir2', 'elixir3'
    ].map((type, index) => {
      const orgType = type.replace(/\d+/g, '');
      const thing = getThing(orgType);
      let undressHandler;

      if (thing && this.props.actions) {
        undressHandler = this._onUndress.bind(this, thing._id);
      }

      return (
        <ThingSlot
          key={index}
          position={position[type]}
          thing={thing}
          type={orgType} />
      );
    });

    return (
      <Paper
        style={styles.base}
        zDepth={2}>
        <ImageSlot
          position={{
            top: 87,
            left: 82
          }}
          image={hero.image} />
        {thingsSlots}
      </Paper>
    );
  }
  _onUndress(id) {
    HeroApi.undressThing(id);
  }
}
