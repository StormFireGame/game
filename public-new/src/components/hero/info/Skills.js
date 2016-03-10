import React, { Component } from 'react';
import mediator from '../../../mediator';
import { connect } from 'react-redux';

function select(state) {
  return { hero: state.hero };
}

export default connect(select)(({ hero, onIncrease }) => {
  const skills = mediator.storage.skills;

  return (
    <div className="uk-panel uk-panel-box">
      <h3 className="uk-panel-title">Skills</h3>

      <div className="uk-grid">
        {skills.map((skill) => {
          return [
            <div className="uk-width-4-10">{skill.name}</div>,
            <div className="uk-width-1-10">
              {0}
            </div>,
            <div className="uk-width-1-10">
              {hero.numberOfSkills ?
                (<a onClick={onIncrease.bind(this, skill.id)} className="uk-icon-hover uk-icon-plus-circle"></a>) : null}
            </div>,
          ];
        })}
      </div>

      {hero.numberOfSkills ?
        <div className="uk-margin-small-top">To increase: {hero.numberOfSkills}</div> : null}
    </div>
  );
});
