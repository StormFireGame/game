var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:heroes:info:skills');

var Paper = mui.Paper;
var FontIcon = mui.FontIcon;

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
            <dd>50 <FontIcon className="mdfi_content_add" /></dd>
            <dt>Dexterity</dt>
            <dd>50 <FontIcon className="mdfi_content_add" /></dd>
            <dt>Intuition</dt>
            <dd>50 <FontIcon className="mdfi_content_add" /></dd>
            <dt>Health</dt>
            <dd>50 <FontIcon className="mdfi_content_add" /></dd>
          </dl>
          <p>Number of increases 53</p>

          <div className="pagination">
            <FontIcon className="mdfi_image_navigate_before" />
            <FontIcon className="mdfi_image_navigate_next" />
          </div>
        </Paper>
      </div>
    );
  }
});

module.exports = HeroesInfoSkills;
