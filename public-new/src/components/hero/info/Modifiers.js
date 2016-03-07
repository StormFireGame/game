import React, { Component } from 'react';
import mediator from '../../../mediator';

export default class extends Component {
  render() {
    const hero = mediator.hero;
    return (
      <div className="uk-panel uk-panel-box">
        <h3 className="uk-panel-title">Modifiers</h3>

        <div className="uk-grid">
          <div className="uk-width-7-10">Dodge</div>
          <div className="uk-width-2-10">{hero.feature.dodge}%</div>

          <div className="uk-width-7-10">Accuracy</div>
          <div className="uk-width-2-10">{hero.feature.accuracy}%</div>

          <div className="uk-width-7-10">Devastate</div>
          <div className="uk-width-2-10">{hero.feature.devastate}%</div>

          <div className="uk-width-7-10">Block break</div>
          <div className="uk-width-2-10">{hero.feature.blockBreak}%</div>

          <div className="uk-width-7-10">Armor break</div>
          <div className="uk-width-2-10">{hero.feature.armorBreak}%</div>
        </div>
      </div>
    );
  }
}
