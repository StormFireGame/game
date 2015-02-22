var React = require('react');
var mui = require('material-ui');

var debug = require('debug')
      ('game:components:hero:info:damage-protection');

var Paper = mui.Paper;

var HeroInfoDamageProtection = React.createClass({
  render: function() {
    var props = this.props;
    var style = {
      width: 170,
      height: 179,
      backgroundColor: 'white'
    };

    debug('render');

    return (
      <div>
        <Paper style={style} rounded={false} zDepth={1} className="block damage-protection-block">
          <div className="mui-font-style-subhead-1">Damage &amp; protection</div>
          <dl className="dl-horizontal">
            <dt className="damage">Damage</dt>
            <dd>{props.damageMin} - {props.damageMax}</dd>
            <dt>Protection head</dt>
            <dd>{props.protectionHead}%</dd>
            <dt>Protection breast</dt>
            <dd>{props.protectionBreast}%</dd>
            <dt>Protection belly</dt>
            <dd>{props.protectionBelly}%</dd>
            <dt>Protection groin</dt>
            <dd>{props.protectionGroin}%</dd>
            <dt>Protection legs</dt>
            <dd>{props.protectionLegs}%</dd>
          </dl>
        </Paper>
      </div>
    );
  }
});

module.exports = HeroInfoDamageProtection;
