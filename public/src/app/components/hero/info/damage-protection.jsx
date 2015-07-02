import React from 'react';
import { List, ListItem } from 'material-ui';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:info:damage-protection');

export default class HeroInfoDamageProtection extends React.Component {
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
        subheader="Damage & protection">
        <ListItem>
          Damage: {props.damageMin} - {props.damageMax}
        </ListItem>
        <ListItem>
          Protection head: {props.protectionHead}%
        </ListItem>
        <ListItem>
          Protection breast: {props.protectionBreast}%
        </ListItem>
        <ListItem>
          Protection belly: {props.protectionBelly}%
        </ListItem>
        <ListItem>
          Protection groin: {props.protectionGroin}%
        </ListItem>
        <ListItem>
          Protection legs: {props.protectionLegs}%
        </ListItem>
      </List>
    );
  }
}
