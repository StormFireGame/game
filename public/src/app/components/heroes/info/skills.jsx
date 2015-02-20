var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:heroes:info:skills');

var Paper = mui.Paper;
var FontIcon = mui.FontIcon;

var HeroesInfoSkills = React.createClass({
  getInitialState: function() {
    return {
      page: 0
    };
  },
  _nextPage: function() {
    this.setState({
      page: this.state.page + 1
    });
  },
  _prevPage: function() {
    this.setState({
      page: this.state.page - 1
    });
  },
  render: function() {
    var props = this.props;
    var perPage = 5;
    var skills = props.skills
      .slice(this.state.page * perPage, this.state.page * perPage + perPage);
    var style = {
      width: 170,
      height: 50 + 20 * skills.length,
      backgroundColor: 'white'
    };

    var items = skills
      .map(function(item) {
        return (
          <div>
            <dt>{item.skill.name}</dt>
            <dd>{item.level}
              {props.numberOfSkills ?
                <FontIcon onClick={props.onIncrease.bind(this, 'skills', item._id)} className="mdfi_content_add" /> : null}
            </dd>
          </div>
        );
      });

    if (props.numberOfSkills) {
      style.height += 30;
    }

    debug('render');

    return (
      <div>
        <Paper style={style} rounded={false} zDepth={1} className="block skills-block">
          <div className="mui-font-style-subhead-1">Skills</div>
          <dl className="dl-horizontal">
            {items}
          </dl>
          {props.numberOfSkills ?
            <p>Number of increases {props.numberOfSkills}</p> : null}

          <div className="pagination">
            {this.state.page > 0 ?
              <FontIcon onClick={this._prevPage} className="mdfi_image_navigate_before" /> : null}
            {(this.state.page + 1) * perPage < props.skills.length ?
              <FontIcon onClick={this._nextPage} className="mdfi_image_navigate_next" /> : null}
          </div>
        </Paper>
      </div>
    );
  }
});

module.exports = HeroesInfoSkills;
