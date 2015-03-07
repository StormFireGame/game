var React = require('react');
var debug = require('debug')('game:components:hero:inventory:items');

var Item = require('./item');

var HeroInventoryItems = React.createClass({
  render: function() {
    debug('render');

    return (
      <div>
        Items
        <Item />
      </div>
    );
  }
});

module.exports = HeroInventoryItems;
