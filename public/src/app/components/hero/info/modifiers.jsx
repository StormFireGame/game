var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:hero:info:modifiers');

var Paper = mui.Paper;

var HeroInfoModifiers = React.createClass({
  render: function() {
    var props = this.props;
    var style = {
      width: 205,
      height: 179
    };

    debug('render');

    return (
      <Paper
        style={style}
        rounded={false}
        zDepth={1}
        className="block modifiers-block">
        <div className="mui-font-style-subhead-1">Modifiers</div>
        <dl className="dl-horizontal">
          <dt>Accuracy</dt>
          <dd>{props.accuracy}%</dd>
          <dt>Dodge</dt>
          <dd>{props.dodge}%</dd>
          <dt>Devastate</dt>
          <dd>{props.devastate}%</dd>
          <dt>Durability</dt>
          <dd>{props.durability}%</dd>
          <dt>Block break</dt>
          <dd>{props.blockBreak}%</dd>
          <dt>Armor break</dt>
          <dd>{props.armorBreak}%</dd>
        </dl>
      </Paper>
    );
  }
});

module.exports = HeroInfoModifiers;
