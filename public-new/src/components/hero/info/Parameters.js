import React, { Component } from 'react';
import capitalize from 'capitalize';

import mediator from '../../../mediator';

export default class extends Component {
  render() {
    const hero = mediator.hero;

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

    return (
      <div className="uk-panel uk-panel-box">
        <h3 className="uk-panel-title">Parameters</h3>
        <div className="uk-grid">
          {['strength', 'dexterity', 'intuition', 'health'].map((parameter) => {
            const parameterCap = capitalize(parameter);

            return [
              <div className="uk-width-4-10">{parameterCap}</div>,
              <div className="uk-width-1-10">
                {hero[parameter]} {renderFeature(hero[parameter], hero.feature[parameter])}
              </div>,
              <div className="uk-width-1-10">
                {hero.numberOfParameters ?
                  (<a href="" className="uk-icon-hover uk-icon-plus-circle"></a>) : null}
              </div>,
            ];
          })}
        </div>

        {hero.numberOfParameters ?
          <div className="uk-margin-small-top">To increase: {hero.numberOfParameters}</div> : null}
      </div>
    );
  }
}
