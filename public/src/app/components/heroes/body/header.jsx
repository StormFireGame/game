var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:heroes:body-header');

var FontIcon = mui.FontIcon;

var HeroesBodyHeader = React.createClass({
  render: function() {
    debug('render');

    return (
      <div>
        <div className="mui-font-style-title hero-title">
          <FontIcon className="mdfi_action_info" /> ButuzGOL [8]
        </div>
        <div className="mui-font-style-body-1 hero-indecators">
          0/20
        </div>
      </div>
    );
  }
});

module.exports = HeroesBodyHeader;
