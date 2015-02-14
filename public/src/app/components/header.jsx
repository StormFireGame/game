var React = require('react');

var Menu = require('./menu');
var Info = require('./info');

var Header = React.createClass({
  render: function() {
    return (
      <header id="header">
        <Menu />
        <Info />
      </header>
    );
  }
});

module.exports = Header;
