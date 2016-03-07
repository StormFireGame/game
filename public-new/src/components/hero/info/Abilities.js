import React, { Component } from 'react';
import capitalize from 'capitalize';

import mediator from '../../../mediator';

export default class extends Component {
  render() {
    const hero = mediator.hero;

    return (
      <div className="uk-panel uk-panel-box">
        <h3 className="uk-panel-title">Abilities</h3>

        <div className="uk-grid">
          {['swords', 'axes', 'knives', 'clubs', 'shields'].map((ability) => {
            const abilityCap = capitalize(ability);

            return [
              <div className="uk-width-4-10">{abilityCap}</div>,
              <div className="uk-width-1-10">
                {hero[ability]}
              </div>,
              <div className="uk-width-1-10">
                {hero.numberOfAbilities ?
                  (<a href="" className="uk-icon-hover uk-icon-plus-circle"></a>) : null}
              </div>,
            ];
          })}
        </div>

        {hero.numberOfAbilities ?
          <div className="uk-margin-small-top">To increase: {hero.numberOfAbilities}</div> : null}
      </div>
    );
  }
}
