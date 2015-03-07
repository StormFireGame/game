var React = require('react');
var debug = require('debug')('game:components:hero:inventory');

var Actions = require('./inventory/actions');
var Items = require('./inventory/items');

var HeroInventory = React.createClass({
  render: function() {
    debug('render');

    return (
      <div>
        <Actions />
        <Items />
      </div>
    );
  }
});

module.exports = HeroInventory;
