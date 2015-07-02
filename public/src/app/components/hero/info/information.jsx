import React from 'react';
import { List, ListItem } from 'material-ui';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:info:information');

export default class HeroInfoInformation extends React.Component {
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
        subheader="Information">
        <ListItem>
          Number of wins: {props.numberOfWins}
        </ListItem>
        <ListItem>
          Number of losses: {props.numberOfLosses}
        </ListItem>
        <ListItem>
          Number of draws: {props.numberOfDraws}
        </ListItem>
        <ListItem>
          Experience: {props.experience}/{props.nextLevelExperience}
        </ListItem>
      </List>
    );
  }
}
