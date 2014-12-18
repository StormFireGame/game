'use strict';

var React = require('react'),
    mui = require('material-ui'),

    IconButton = mui.IconButton;

var Footer = React.createClass({
  render: function() {
    return (
      <footer id="footer">
        <IconButton className="github-icon-button" icon="mui-icon-github" onTouchTap={this._onGithubTouchTap} />
      </footer>
    );
  },
  _onGithubTouchTap: function() {
    document.location.href='https://github.com/DragonLegend/game';
  }
});

module.exports = Footer;
