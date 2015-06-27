import React from 'react';
import { Paper } from 'material-ui';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:info:damage-protection');

export default class HeroInfoDamageProtection extends React.Component {
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
        className="block damage-protection-block">
        <div className="mui-font-style-subhead-1">Damage &amp; protection</div>
        <dl className="dl-horizontal">
          <dt className="damage">Damage</dt>
          <dd>{props.damageMin} - {props.damageMax}</dd>
          <dt>Protection head</dt>
          <dd>{props.protectionHead}%</dd>
          <dt>Protection breast</dt>
          <dd>{props.protectionBreast}%</dd>
          <dt>Protection belly</dt>
          <dd>{props.protectionBelly}%</dd>
          <dt>Protection groin</dt>
          <dd>{props.protectionGroin}%</dd>
          <dt>Protection legs</dt>
          <dd>{props.protectionLegs}%</dd>
        </dl>
      </Paper>
    );
  }
}
