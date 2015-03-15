var React = require('react');
var debug = require('debug')('game:components:hero:inventory');

var Actions = require('./inventory/actions');
var Items = require('./inventory/items');

var HeroInventory = React.createClass({
  render: function() {
    var things = this.props.hero.things.filter(function(thing) {
      return !thing.dressed;
    });

    debug('render');

    return (
      <div>
        <Actions />
        <Items hero={this.props.hero} things={things} />
      </div>
    );
  }
});

module.exports = HeroInventory;
