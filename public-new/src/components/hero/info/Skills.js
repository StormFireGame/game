import React, { Component } from 'react';
import mediator from '../../../mediator';

export default class extends Component {
  render() {
    const hero = mediator.hero;
    const skills = window.data.skills;

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
                  (<a href="" className="uk-icon-hover uk-icon-plus-circle"></a>) : null}
              </div>,
            ];
          })}
        </div>

        {hero.numberOfSkills ?
          <div className="uk-margin-small-top">To increase: {hero.numberOfSkills}</div> : null}
      </div>
    );
  }
}
