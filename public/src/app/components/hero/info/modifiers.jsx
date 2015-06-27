import React from 'react';
import { Paper } from 'material-ui';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:info:modifiers');

export default class HeroInfoModifiers extends React.Component {
  render() {
    const props = this.props;
    const style = {
      width: 205,
      height: 179
    };

    debug('render');

    return (
      <Paper
        style={style}
        rounded={false}
        zDepth={1}
        className="block modifiers-block">
        <div className="mui-font-style-subhead-1">Modifiers</div>
        <dl className="dl-horizontal">
          <dt>Accuracy</dt>
          <dd>{props.accuracy}%</dd>
          <dt>Dodge</dt>
          <dd>{props.dodge}%</dd>
          <dt>Devastate</dt>
          <dd>{props.devastate}%</dd>
          <dt>Durability</dt>
          <dd>{props.durability}%</dd>
          <dt>Block break</dt>
          <dd>{props.blockBreak}%</dd>
          <dt>Armor break</dt>
          <dd>{props.armorBreak}%</dd>
        </dl>
      </Paper>
    );
  }
}
