import React from 'react';
import { Paper, FontIcon } from 'material-ui';
import _ from 'lodash';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:info:parameters');

export default class HeroInfoParameters extends React.Component {
  static propTypes = {
    numberOfAbilities: React.PropTypes.number,
    increaseHandler: React.PropTypes.func
  };

  render() {
    const props = this.props;
    const parameters = ['strength', 'dexterity', 'intuition', 'health'];
    let items;
    let style = {
      width: 205,
      height: 50 + 20 * parameters.length,
      backgroundColor: 'white'
    };

    if (props.numberOfParameters) {
      style.height += 30;
    }

    function renderFeature(orig, feature) {
      let output = '';
      if (orig - feature === 0) {
        return output;
      }

      output += ' [';

      if (feature > orig) {
        output += '+';
      }

      output += feature - orig;

      output += ']';
      return output;
    }

    items = parameters
      .map((parameter, key) => {
        const parameterCap = _.capitalize(parameter);
        return (
          <div key={key}>
            <dt>{parameterCap}</dt>
            <dd>
              {props[parameter]}
              {renderFeature(props[parameter], props['feature' + parameterCap])}
              {props.numberOfParameters ?
                <FontIcon
                  onClick={props.increaseHandler.bind(this, 'parameters', parameter)}
                  className="mdfi_content_add" /> : null}
            </dd>
          </div>
        );
      });

    debug('render');

    return (
      <Paper style={style} rounded={false} zDepth={1} className="block parameters-block">
        <div className="mui-font-style-subhead-1">Parameters</div>
        <dl className="dl-horizontal">
          {items}
        </dl>
        {props.numberOfParameters ?
          <p>Number of increases {props.numberOfParameters}</p> : null}
      </Paper>
    );
  }
}
