var React = require('react');

var Menu = require('./menu.jsx');
var Info = require('./info.jsx');

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
