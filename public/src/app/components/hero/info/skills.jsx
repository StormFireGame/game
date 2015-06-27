import React from 'react';
import { Paper, FontIcon } from 'material-ui';
import _ from 'lodash';

import SkillStore from '../../../stores/skill-store';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:info:skills');

function getInfoSkillsState() {
  return {
    skills: SkillStore.get(),
    page: 0
  };
}

export default class HeroInfoSkills extends React.Component {
  static propTypes = {
    skill: React.PropTypes.array,
    numberOfSkills: React.PropTypes.number,
    increaseHandler: React.PropTypes.func
  };

  state = getInfoSkillsState();

  componentDidMount() {
    SkillStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    SkillStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState(getInfoSkillsState());
  }
  render() {
    const props = this.props;
    const perPage = 5;
    const skills = this.state.skills
      .slice(this.state.page * perPage, this.state.page * perPage + perPage);
    let style = {
      width: 204,
      height: 50 + 20 * skills.length
    };

    const items = skills
      .map((skill, index) => {
        var item = _(props.skills).find((heroSkill) => {
          return heroSkill.skill === skill._id;
        });

        return (
          <div key={index}>
            <dt>{skill.name}</dt>
            <dd>{item ? item.level : 0}
              {props.numberOfSkills ?
                <FontIcon
                  onClick={props.increaseHandler.bind(this, 'skills', skill._id)}
                  className="mdfi_content_add" /> : null}
            </dd>
          </div>
        );
      });

    if (props.numberOfSkills) {
      style.height += 30;
    }

    debug('render');

    return (
      <Paper
        style={style}
        rounded={false}
        zDepth={1}
        className="block skills-block">
        <div className="mui-font-style-subhead-1">Skills</div>
        <dl className="dl-horizontal">
          {items}
        </dl>
        {props.numberOfSkills ?
          <p>Number of increases {props.numberOfSkills}</p> : null}

        <div className="pagination">
          {this.state.page > 0 ?
            <FontIcon
              onClick={this._onPrevPage}
              className="mdfi_image_navigate_before" /> : null}
          {(this.state.page + 1) * perPage < this.state.skills.length ?
            <FontIcon
              onClick={this._onNextPage}
              className="mdfi_image_navigate_next" /> : null}
        </div>
      </Paper>
    );
  }
   _onNextPage() {
    this.setState({
      page: this.state.page + 1
    });
  }
  _onPrevPage() {
    this.setState({
      page: this.state.page - 1
    });
  }
}
