import React from 'react';
import { connect } from 'react-redux';

function select(state) {
  return { hero: state.hero };
}

export default connect(select)(({ hero }) => (
  <div className="uk-panel uk-panel-box">
    <h3 className="uk-panel-title">Damage & Protection</h3>

    <div className="uk-grid">
      <div className="uk-width-5-10">Damage</div>
      <div className="uk-width-5-10">{hero.feature.damageMin} - {hero.feature.damageMax}</div>

      <div className="uk-text-bold uk-margin-small-top">Protection</div>
      <div className="uk-width-5-10">Head</div>
      <div className="uk-width-1-10">{hero.feature.protectionHead}%</div>

      <div className="uk-width-5-10">Breast</div>
      <div className="uk-width-1-10">{hero.feature.protectionBreast}%</div>

      <div className="uk-width-5-10">Belly</div>
      <div className="uk-width-1-10">{hero.feature.protectionBelly}%</div>

      <div className="uk-width-5-10">Groin</div>
      <div className="uk-width-1-10">{hero.feature.protectionGroin}%</div>

      <div className="uk-width-5-10">Legs</div>
      <div className="uk-width-1-10">{hero.feature.protectionLegs}%</div>
    </div>

  </div>
));
