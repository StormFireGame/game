var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');

var SkillStore = require('../../../stores/skill-store');

var debug = require('debug')('game:components:hero:info:skills');

var Paper = mui.Paper;
var FontIcon = mui.FontIcon;

function getInfoSkillsState() {
  return {
    skills: SkillStore.get(),
    page: 0
  };
}

var HeroInfoSkills = React.createClass({
  propTypes: {
    skill: React.PropTypes.array,
    numberOfSkills: React.PropTypes.number,
    increaseHandler: React.PropTypes.func
  },
  getInitialState: function() {
    return getInfoSkillsState();
  },
  componentDidMount: function() {
    SkillStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    SkillStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getInfoSkillsState());
  },
  render: function() {
    var props = this.props;
    var perPage = 5;
    var skills = this.state.skills
      .slice(this.state.page * perPage, this.state.page * perPage + perPage);
    var style = {
      width: 210,
      height: 50 + 20 * skills.length
    };

    var items = skills
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
  },
   _onNextPage: function() {
    this.setState({
      page: this.state.page + 1
    });
  },
  _onPrevPage: function() {
    this.setState({
      page: this.state.page - 1
    });
  }
});

module.exports = HeroInfoSkills;
