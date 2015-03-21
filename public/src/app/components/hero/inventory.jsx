var React = require('react');
var debug = require('debug')('game:components:hero:inventory');

var Actions = require('./inventory/actions');
var Items = require('./inventory/items');

var HeroInventory = React.createClass({
  getInitialState: function() {
    return {
      filter: null
    };
  },
  _filterHandler: function(type) {
    this.setState({
      filter: type
    });
  },
  render: function() {
    var things = this.props.hero.things.filter(function(thing) {
      var filter = this.state.filter;
      return !thing.dressed && (!filter || thing.thing.type === filter);
    }.bind(this));

    debug('render');

    return (
      <div>
        <Actions
          hero={this.props.hero}
          filterHandler={this._filterHandler} />
        <Items
          hero={this.props.hero}
          things={things} />
      </div>
    );
  }
});

module.exports = HeroInventory;
