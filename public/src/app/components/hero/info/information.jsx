import React from 'react';
import { Paper } from 'material-ui';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:info:information');

export default class HeroInfoInformation extends React.Component {
  render() {
    const props = this.props;
    const style = {
      width: 205,
      height: 140
    };

    debug('render');

    return (
      <Paper
        style={style}
        rounded={false}
        zDepth={1}
        className="block information-block">
        <div className="mui-font-style-subhead-1">Information</div>
        <dl className="dl-horizontal">
          <dt>Number of wins</dt>
          <dd>{props.numberOfWins}</dd>
          <dt>Number of losses</dt>
          <dd>{props.numberOfLosses}</dd>
          <dt>Number of draws</dt>
          <dd>{props.numberOfDraws}</dd>
          <dt className="experience">Experience</dt>
          <dd>{props.experience}/{props.nextLevelExperience}</dd>
        </dl>
      </Paper>
    );
  }
}
