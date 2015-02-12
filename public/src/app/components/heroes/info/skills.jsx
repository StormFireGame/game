var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:heroes:info:skills');

var Paper = mui.Paper;
var Icon = mui.Icon;

var HeroesInfoSkills = React.createClass({
  render: function() {
    debug('render');

    var style = {
      width: 170,
      height: 160,
      backgroundColor: 'white'
    };

    return (
      <div>
        <Paper style={style} rounded={false} zDepth={1} className="block skills-block">
          <div className="mui-font-style-subhead-1">Skills</div>
          <dl className="dl-horizontal">
            <dt>Strength</dt>
            <dd>50 <Icon icon="content-add" /></dd>
            <dt>Dexterity</dt>
            <dd>50 <Icon icon="content-add" /></dd>
            <dt>Intuition</dt>
            <dd>50 <Icon icon="content-add" /></dd>
            <dt>Health</dt>
            <dd>50 <Icon icon="content-add" /></dd>
          </dl>
          <p>Number of increases 53</p>

          <div className="pagination">
            <Icon icon="image-navigate-before" />
            <Icon icon="image-navigate-next" />
          </div>
        </Paper>
      </div>
    );
  }
});

module.exports = HeroesInfoSkills;
