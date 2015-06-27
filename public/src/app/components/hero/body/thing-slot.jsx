import React from 'react';
import { Paper } from 'material-ui';
import _ from 'lodash';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:body-thing-slot');

export default class HeroBodyThingSlot extends React.Component {
  static propTypes = {
    type: React.PropTypes.string,
    thing: React.PropTypes.object
  };

  render() {
    const props = this.props;
    const type = props.type;
    const thingWrap = props.thing;
    const thing = thingWrap ? thingWrap.thing : null;
    let width = 70;
    let height;
    let info = [];

    switch(type) {
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

    const style = {
      width: width,
      height: height
    };

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
        style={style}
        rounded={false}
        innerClassName={`slot-${type}`}
        zDepth={1}>
        {thing ?
          <img src={thing.image} /> : null}
      </Paper>
    );
  }
}
