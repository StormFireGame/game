var React = require('react');
var debug = require('debug')('game:components:hero:inventory:items');

var Item = require('./item');

var HeroInventoryItems = React.createClass({
  propTypes: {
    things: React.PropTypes.array
  },
  render: function() {
    debug('render');

    var items = this.props.things.map(function(thing, index) {
      return (
        <Item
          key={index}
          thing={thing}
          hero={this.props.hero} />
      );
    }.bind(this));

    return (
      <div className="items-wrapper">
        {items}
      </div>
    );
  }
});

module.exports = HeroInventoryItems;
