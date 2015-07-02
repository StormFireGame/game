import React from 'react';
import { Paper } from 'material-ui';
import _ from 'lodash';

import assign from 'object-assign';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:body-thing-slot');

export default class HeroBodyThingSlot extends React.Component {
  static propTypes = {
    type: React.PropTypes.string,
    thing: React.PropTypes.object,
    position: React.PropTypes.object,
  };

  getStyles() {
    const props = this.props;
    let width = 70;
    let height;

    switch(props.type) {
      case 'gloves':
      case 'helmet':
      case 'amulet':
      case 'treetops':
        height = 75;
        break;
      case 'arms':
        height = 85;
        break;
      case 'armor':
        height = 90;
        break;
      case 'pants':
        height = 110;
        break;
      case 'elixir':
        height = 32;
        width = 32;
        break;
      case 'shield':
        height = 85;
        break;
      case 'ring':
        height = 32;
        width = 32;
        break;
      case 'belt':
        height = 50;
        break;
      case 'boots':
        height = 74;
        break;
    }

    let styles = {
      base: assign({
        width: width,
        height: height,
        position: 'absolute'
      })
    };

    if (props.position) {
      assign(styles.base, {
        left: props.position.left,
        top: props.position.top
      });
    }

    [
      'gloves', 'helmet', 'amulet', 'treetops', 'shield', 'ring', 'belt',
      'boots', 'elixir', 'pants', 'armor', 'arms'
    ].forEach((item) => {
      styles[item] = {
        position: 'absolute',
        top: 2,
        left: 2,
        backgroundImage: `url(../images/hero-body/${item}.png)`,
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat'
      };
    });

    return styles;
  }

  render() {
    const type = this.props.type;
    const thingWrap = this.props.thing;
    const thing = thingWrap ? thingWrap.thing : null;
    let info = [];

    const styles = this.getStyles();

    if (thing) {
      info.push('Name: ' + thing.name);
      info.push('Money: ' + thing.price);
      info.push('Stability: ' +
        thingWrap.stabilityAll  + '/' + thingWrap.stabilityLeft);

      [
        'strengthGive', 'dexterityGive', 'intuitionGive', 'healthGive',
        'swordsGive', 'axesGive', 'knivesGive', 'clubsGive', 'shieldsGive',

        'damageMin', 'damageMax',

        'protectionHead', 'protectionBreast', 'protectionBelly',
        'protectionGroin', 'protectionLegs',

        'accuracy', 'dodge', 'devastate', 'durability',
        'blockBreak', 'armorBreak',
        'hp',
        'strikeCount', 'blockCount',
        'capacity',
        'isTwoHands',
        'timeDuration'
      ].forEach((item) => {
        if (_.isUndefined(thing[item])) return;
        const label = _.capitalize(item.replace('Give', ''));
        info.push(label + ': ' + thing[item]);
      });
    }

    debug('render type %s', type);

    return (
      <Paper
        title={info.join('\n')}
        style={styles.base}
        rounded={false}
        zDepth={1}>
        <div style={styles[type]}></div>
        {thing ?
          <img src={thing.image} /> : null}
      </Paper>
    );
  }
}
