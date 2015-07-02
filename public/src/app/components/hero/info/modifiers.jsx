import React from 'react';
import { List, ListItem } from 'material-ui';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:info:modifiers');

export default class HeroInfoModifiers extends React.Component {
  getStyles() {
    return {
      base: {
        width: 200
      }
    };
  }

  render() {
    const props = this.props;

    debug('render');

    return (
      <List
        style={this.getStyles().base}
        subheader="Modifiers">
        <ListItem>
          Accuracy: {props.accuracy}%
        </ListItem>
        <ListItem>
          Dodge: {props.dodge}%
        </ListItem>
        <ListItem>
          Devastate: {props.devastate}%
        </ListItem>
        <ListItem>
          Durability: {props.durability}%
        </ListItem>
        <ListItem>
          Block break: {props.blockBreak}%
        </ListItem>
        <ListItem>
          Armor break: {props.armorBreak}%
        </ListItem>
      </List>
    );
  }
}
