var React = require('react');
var mui = require('material-ui');

var debug = require('debug')
      ('game:components:heroes:info:damage-protection');

var Paper = mui.Paper;

var HeroesInfoDamageProtection = React.createClass({
  render: function() {
    debug('render');

    var style = {
      width: 170,
      height: 160,
      backgroundColor: 'white'
    };

    return (
      <div>
        <Paper style={style} rounded={false} zDepth={1} className="block damage-protection-block">
          <div className="mui-font-style-subhead-1">Damage &amp; protection</div>
          <dl className="dl-horizontal">
            <dt className="damage">Damage</dt>
            <dd>20 - 100</dd>
            <dt>Protection head</dt>
            <dd>30%</dd>
            <dt>Protection head</dt>
            <dd>50%</dd>
            <dt>Protection zone</dt>
            <dd>50%</dd>
            <dt>Protection legs</dt>
            <dd>50%</dd>
          </dl>
        </Paper>
      </div>
    );
  }
});

module.exports = HeroesInfoDamageProtection;
