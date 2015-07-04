import React from 'react';
import { List, ListItem, IconButton } from 'material-ui';
import _ from 'lodash';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:info:abilities');

export default class HeroInfoAbilities extends React.Component {
  static propTypes = {
    numberOfAbilities: React.PropTypes.number,
    increaseHandler: React.PropTypes.func
  };

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
        subheader="Abilities">
        {['swords', 'axes', 'knives', 'clubs', 'shields'].map((ability, index) => {
          const abilityCap = _.capitalize(ability);
          return (
            <ListItem
              key={index}
              rightIconButton={
                props.numberOfAbilities ?
                  <IconButton
                    onClick={props.increaseHandler.bind(this, 'abilities', ability)}
                    iconClassName="mdficontentadd" /> : null}>
              {abilityCap}{': '}
              {props[ability]}
            </ListItem>
          );
        })}
        {props.numberOfAbilities ?
          (<ListItem>
            To increase: {props.numberOfAbilities}
          </ListItem>) : null}
      </List>
    );
  }
}
