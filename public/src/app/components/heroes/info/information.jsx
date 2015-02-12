var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:heroes:info:information');

var Paper = mui.Paper;

var HeroesInfoInformation = React.createClass({
  render: function() {
    debug('render');

    var style = {
      width: 170,
      height: 140,
      backgroundColor: 'white'
    };

    return (
      <div>
        <Paper style={style} rounded={false} zDepth={1} className="block information-block">
          <div className="mui-font-style-subhead-1">Information</div>
          <dl className="dl-horizontal">
            <dt>Number of wins</dt>
            <dd>50</dd>
            <dt>Number of losses</dt>
            <dd>50</dd>
            <dt>Number of draws</dt>
            <dd>50</dd>
            <dt className="experiance">Experiance</dt>
            <dd>200/900</dd>
          </dl>
        </Paper>
      </div>
    );
  }
});

module.exports = HeroesInfoInformation;
