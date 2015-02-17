var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:heroes:body-header');

var FontIcon = mui.FontIcon;

var HeroesBodyHeader = React.createClass({
  render: function() {
    var hp = this.props.hp.split('|');

    debug('render');

    return (
      <div>
        <div className="mui-font-style-title hero-title">
          <FontIcon className="mdfi_action_info" /> {this.props.login} [{this.props.level}]
        </div>
        <div className="mui-font-style-body-1 hero-indecators">
          {hp[0]}/{hp[1]}
        </div>
      </div>
    );
  }
});

module.exports = HeroesBodyHeader;
