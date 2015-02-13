var React = require('react');
var mui = require('material-ui');

var IconButton = mui.IconButton;

var Footer = React.createClass({
  render: function() {
    return (
      <footer id="footer">
        <IconButton iconClassName="icon-github" href="https://github.com/DragonLegend/game" linkButton={true} />
      </footer>
    );
  }
});

module.exports = Footer;
