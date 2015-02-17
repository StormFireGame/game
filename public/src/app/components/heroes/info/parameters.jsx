var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:heroes:info:parameters');

var Paper = mui.Paper;
var FontIcon = mui.FontIcon;

var HeroesInfoParameters = React.createClass({
  _renderFeature: function(orig, feature) {
    if (orig) {}
  },
  render: function() {
    var props = this.props;

    debug('render');

    var style = {
      width: 170,
      height: 160,
      backgroundColor: 'white'
    };

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

    return (
      <div>
        <Paper style={style} rounded={false} zDepth={1} className="block parameters-block">
          <div className="mui-font-style-subhead-1">Parameters</div>
          <dl className="dl-horizontal">
            <dt>Strength</dt>
            <dd>
              {props.strength}
              {renderFeature(props.strength, props.featureStrength)}
              {props.numberOfParameters ?
                <FontIcon className="mdfi_content_add" /> : null}
            </dd>
            <dt>Dexterity</dt>
            <dd>
              {props.dexterity}
              {renderFeature(props.dexterity, props.featureDexterity)}
              {props.numberOfParameters ?
                <FontIcon className="mdfi_content_add" /> : null}
            </dd>
            <dt>Intuition</dt>
            <dd>
              {props.intuition}
              {renderFeature(props.intuition, props.featureIntuition)}
              {props.numberOfParameters ?
                <FontIcon className="mdfi_content_add" /> : null}
            </dd>
            <dt>Health</dt>
            <dd>
              {props.health}
              {renderFeature(props.health, props.featureHealth)}
              {props.numberOfParameters ?
                <FontIcon className="mdfi_content_add" /> : null}
            </dd>
          </dl>
          {props.numberOfParameters ?
            <p>Number of increases {props.numberOfParameters}</p> : null}
        </Paper>
      </div>
    );
  }
});

module.exports = HeroesInfoParameters;
