import React, { Component } from 'react';
import mediator from '../../../mediator';
import { increaseSkill } from '../../../actions/heroActions';
import { connect } from 'react-redux';

function select(state) {
  return { hero: state.hero };
}

export default connect(select)(({ hero, dispatch }) => (
  <div className="uk-panel uk-panel-box">
    <h3 className="uk-panel-title">Skills</h3>

    <div className="uk-grid">
      {mediator.storage.skills.map((skill) => {
        const heroSkill = hero.skills.find((item) => item.skill === skill.id);
        return [
          <div className="uk-width-4-10">{skill.name}</div>,
          <div className="uk-width-1-10">
            {heroSkill ? heroSkill.level : 0}
          </div>,
          <div className="uk-width-1-10">
            {hero.numberOfSkills ?
              (
                <a onClick={() => {
                  dispatch(increaseSkill(skill.id));
                }} className="uk-icon-hover uk-icon-plus-circle"
                />
              ) : null}
          </div>,
        ];
      })}
    </div>

    {hero.numberOfSkills ?
      <div className="uk-margin-small-top">To increase: {hero.numberOfSkills}</div> : null}
  </div>
));
