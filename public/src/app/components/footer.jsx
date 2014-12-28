var React = require('react'),
    mui = require('material-ui'),

    IconButton = mui.IconButton;

var Footer = React.createClass({
  render: function() {
    return (
      <footer id="footer">
        <IconButton className="github-icon-button" href="https://github.com/DragonLegend/game" icon="mui-icon-github" linkButton={true} />
      </footer>
    );
  }
});

module.exports = Footer;
