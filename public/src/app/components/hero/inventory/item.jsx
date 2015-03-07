var React = require('react');
var debug = require('debug')('game:components:hero:inventory:item');

var HeroInventoryItem = React.createClass({
  render: function() {
    debug('render');

    return (
      <div>
        Item
      </div>
    );
  }
});

module.exports = HeroInventoryItem;
