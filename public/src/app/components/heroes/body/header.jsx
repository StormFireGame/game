var React = require('react'),
    mui = require('material-ui'),

    debug = require('debug')('game:components:heroes:body-header'),

    Icon = mui.Icon;

var HeroesBodyHeader = React.createClass({
  render: function() {
    debug('render');

    return (
      <div>
        <div className="mui-font-style-title hero-title">
          <Icon icon="action-info" /> ButuzGOL [8]
        </div>
        <div className="mui-font-style-body-1 hero-indecators">
          0/20
        </div>
      </div>
    );
  }
});

module.exports = HeroesBodyHeader;
