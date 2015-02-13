var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:heroes:info:abilities');

var Paper = mui.Paper;
var FontIcon = mui.FontIcon;

var HeroesInfoAbilities = React.createClass({
  render: function() {
    debug('render');

    var style = {
      width: 170,
      height: 180,
      backgroundColor: 'white'
    };

    return (
      <div>
        <Paper style={style} rounded={false} zDepth={1} className="block abilities-block">
          <div className="mui-font-style-subhead-1">Abilities</div>
          <dl className="dl-horizontal">
            <dt>Swords</dt>
            <dd>50 <FontIcon className="mdfi_content_add" /></dd>
            <dt>Axes</dt>
            <dd>50 <FontIcon className="mdfi_content_add" /></dd>
            <dt>Knives</dt>
            <dd>50 <FontIcon className="mdfi_content_add" /></dd>
            <dt>Clubs</dt>
            <dd>50 <FontIcon className="mdfi_content_add" /></dd>
            <dt>Shields</dt>
            <dd>50 <FontIcon className="mdfi_content_add" /></dd>
          </dl>
          <p>Number of increases 53</p>
        </Paper>
      </div>
    );
  }
});

module.exports = HeroesInfoAbilities;
