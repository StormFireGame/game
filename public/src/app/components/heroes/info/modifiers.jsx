var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:heroes:info:modifiers');

var Paper = mui.Paper;

var HeroesInfoModifiers = React.createClass({
  render: function() {
    debug('render');

    var style = {
      width: 170,
      height: 179,
      backgroundColor: 'white'
    };

    return (
      <div>
        <Paper style={style} rounded={false} zDepth={1} className="block modifiers-block">
          <div className="mui-font-style-subhead-1">Modifiers</div>
          <dl className="dl-horizontal">
            <dt>Accuracy</dt>
            <dd>75%</dd>
            <dt>Dodge</dt>
            <dd>50%</dd>
            <dt>Devastate</dt>
            <dd>50%</dd>
            <dt>Durability</dt>
            <dd>20%</dd>
            <dt>Block break</dt>
            <dd>200%</dd>
            <dt>Armor break</dt>
            <dd>200%</dd>
          </dl>
        </Paper>
      </div>
    );
  }
});

module.exports = HeroesInfoModifiers;
