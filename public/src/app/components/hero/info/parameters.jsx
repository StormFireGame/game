import React from 'react';
import { List, ListItem, IconButton } from 'material-ui';
import _ from 'lodash';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:info:parameters');

export default class HeroInfoParameters extends React.Component {
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

    debug('render');

    return (
      <List
        style={this.getStyles().base}
        subheader="Parameters">
        {['strength', 'dexterity', 'intuition', 'health'].map((parameter, index) => {
          const parameterCap = _.capitalize(parameter);
          return (
            <ListItem
              key={index}
              rightIconButton={
                props.numberOfParameters ?
                  <IconButton
                    onClick={props.increaseHandler.bind(this, 'parameters', parameter)}
                    iconClassName="mdfi_content_add" /> : null}>
              {parameterCap}{': '}
              {props[parameter]}
              {renderFeature(props[parameter], props['feature' + parameterCap])}
            </ListItem>
          );
        })}
        {props.numberOfParameters ?
          (<ListItem>
            To increase: {props.numberOfParameters}
          </ListItem>) : null}
      </List>
    );
  }
}
