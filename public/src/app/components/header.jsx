var React = require('react'),

    Menu = require('./menu.jsx');

var Header = React.createClass({
  render: function() {
    return (
      <header id="header">
        <Menu />
      </header>
    );
  }
});

module.exports = Header;
