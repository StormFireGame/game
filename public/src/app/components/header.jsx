var React = require('react');

var Menu = require('./menu');
var Info = require('./info');

var debug = require('debug')('game:components:header');

var Header = React.createClass({
  render: function() {
    debug('render');

    return (
      <header id="header">
        <Menu />
        <Info />
      </header>
    );
  }
});

module.exports = Header;
