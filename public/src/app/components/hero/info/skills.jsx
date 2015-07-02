import React from 'react';
import { List, ListItem, IconButton } from 'material-ui';
import _ from 'lodash';

import SkillStore from '../../../stores/skill-store';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:info:skills');

function getInfoSkillsState() {
  return {
    skills: SkillStore.get()
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
    SkillStore.addChangeListener(::this._onChange);
  }
  componentWillUnmount() {
    SkillStore.removeChangeListener(::this._onChange);
  }
  _onChange() {
    this.setState(getInfoSkillsState());
  }

  getStyles() {
    return {
      base: {
        width: 200
      }
    };
  }

  render() {
    const props = this.props;

    debug('render');

    return (
      <List
        style={this.getStyles().base}
        subheader="Skills">
        {this.state.skills.map((skill, index) => {
          const item = _(props.skills).find((heroSkill) => {
            return heroSkill.skill === skill._id;
          });

          return (
            <ListItem
              key={index}
              rightIconButton={
                props.numberOfSkills ?
                  <IconButton
                    onClick={props.increaseHandler.bind(this, 'skills', skill._id)}
                    iconClassName="mdfi_content_add" /> : null}>
              {skill.name}{': '}
              {item ? item.level : 0}
            </ListItem>
          );
        })}

        {props.numberOfSkills ?
          (<ListItem>
            To increase: {props.numberOfSkills}
          </ListItem>) : null}
      </List>
    );
  }
}
