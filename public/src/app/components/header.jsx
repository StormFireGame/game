var React = require('react'),

    Menu = require('./menu.jsx'),
    Info = require('./info.jsx');

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
