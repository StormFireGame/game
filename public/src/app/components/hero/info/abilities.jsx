import React from 'react';
import { Paper, FontIcon } from 'material-ui';
import _ from 'lodash';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:info:abilities');

export default class HeroInfoAbilities extends React.Component {
  static propTypes = {
    numberOfAbilities: React.PropTypes.number,
    increaseHandler: React.PropTypes.func
  };

  render() {
    const props = this.props;
    const abilities = ['swords', 'axes', 'knives', 'clubs', 'shields'];
    let items;
    let style = {
      width: 204,
      height: 50 + 20 * abilities.length
    };

    if (props.numberOfAbilities) {
      style.height += 30;
    }

    items = abilities
      .map((ability, index) => {
        var abilityCap = _.capitalize(ability);

        return (
          <div key={index}>
            <dt>{abilityCap}</dt>
            <dd>
              {props[ability]}
              {props.numberOfAbilities ?
                <FontIcon
                  onClick={props.increaseHandler.bind(this, 'abilities', ability)}
                  className="mdfi_content_add" /> : null}
            </dd>
          </div>
        );
      });

    debug('render');

    return (
      <Paper
        style={style}
        rounded={false}
        zDepth={1}
        className="block abilities-block">
        <div className="mui-font-style-subhead-1">Abilities</div>
        <dl className="dl-horizontal">
          {items}
        </dl>
        {props.numberOfAbilities ?
          <p>Number of increases {props.numberOfAbilities}</p> : null}
      </Paper>
    );
  }
}
