var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:heroes:info:parameters');

var Paper = mui.Paper;
var FontIcon = mui.FontIcon;

var HeroesInfoParameters = React.createClass({
  render: function() {
    debug('render');

    var style = {
      width: 170,
      height: 160,
      backgroundColor: 'white'
    };

    return (
      <div>
        <Paper style={style} rounded={false} zDepth={1} className="block parameters-block">
          <div className="mui-font-style-subhead-1">Parameters</div>
          <dl className="dl-horizontal">
            <dt>Strength</dt>
            <dd>50 [+20] <FontIcon className="mdfi_content_add" /></dd>
            <dt>Dexterity</dt>
            <dd>50 [+20] <FontIcon className="mdfi_content_add" /></dd>
            <dt>Intuition</dt>
            <dd>50 [+20] <FontIcon className="mdfi_content_add" /></dd>
            <dt>Health</dt>
            <dd>50 [+20] <FontIcon className="mdfi_content_add" /></dd>
          </dl>
          <p>Number of increases 53</p>
        </Paper>
      </div>
    );
  }
});

module.exports = HeroesInfoParameters;
