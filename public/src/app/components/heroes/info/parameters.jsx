var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');

var debug = require('debug')('game:components:heroes:info:parameters');

var Paper = mui.Paper;
var FontIcon = mui.FontIcon;

var HeroesInfoParameters = React.createClass({
  render: function() {
    var props = this.props;
    var parameters = ['strength', 'dexterity', 'intuition', 'health'];
    var items;
    var style = {
      width: 170,
      height: 50 + 20 * parameters.length,
      backgroundColor: 'white'
    };

    if (props.numberOfParameters) {
      style.height += 30;
    }

    function renderFeature(orig, feature) {
      var output = '';
      if (orig - feature === 0) {
        return output;
      }

      output += '[';

      if (feature > orig) {
        output = '+ ';
      }

      output += feature - orig;

      output += ']';
      return output;
    }

    items = parameters
      .map(function(parameter) {
        var parameterCap = _.capitalize(parameter);
        return (
          <div>
            <dt>{parameterCap}</dt>
            <dd>
              {props[parameter]}
              {renderFeature(props[parameter], props['feature' + parameterCap])}
              {props.numberOfParameters ?
                <FontIcon onClick={props.onIncrease.bind(this, 'parameters', parameter)} className="mdfi_content_add" /> : null}
            </dd>
          </div>
        );
      });

    debug('render');

    return (
      <div>
        <Paper style={style} rounded={false} zDepth={1} className="block parameters-block">
          <div className="mui-font-style-subhead-1">Parameters</div>
          <dl className="dl-horizontal">
            {items}
          </dl>
          {props.numberOfParameters ?
            <p>Number of increases {props.numberOfParameters}</p> : null}
        </Paper>
      </div>
    );
  }
});

module.exports = HeroesInfoParameters;
