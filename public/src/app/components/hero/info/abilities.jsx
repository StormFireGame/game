var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');

var debug = require('debug')('game:components:hero:info:abilities');

var Paper = mui.Paper;
var FontIcon = mui.FontIcon;

var HeroInfoAbilities = React.createClass({
  render: function() {
    var props = this.props;
    var abilities = ['swords', 'axes', 'knives', 'clubs', 'shields'];
    var items;
    var style = {
      width: 205,
      height: 50 + 20 * abilities.length,
      backgroundColor: 'white'
    };

    if (props.numberOfAbilities) {
      style.height += 30;
    }

    items = abilities
      .map(function(ability) {
        var abilityCap = _.capitalize(ability);
        return (
          <div>
            <dt>{abilityCap}</dt>
            <dd>
              {props[ability]}
              {props.numberOfAbilities ?
                <FontIcon onClick={props.onIncrease.bind(this, 'abilities', ability)} className="mdfi_content_add" /> : null}
            </dd>
          </div>
        );
      });

    debug('render');

    return (
      <div>
        <Paper style={style} rounded={false} zDepth={1} className="block abilities-block">
          <div className="mui-font-style-subhead-1">Abilities</div>
          <dl className="dl-horizontal">
            {items}
          </dl>
          {props.numberOfAbilities ?
            <p>Number of increases {props.numberOfAbilities}</p> : null}
        </Paper>
      </div>
    );
  }
});

module.exports = HeroInfoAbilities;
