var React = require('react');
var _ = require('lodash');
var assign = require('object-assign');

var debug = require('debug')('game:components:hero:inventory');

var HeroListenerMixin = require('./mixins/hero-listener');

var Actions = require('./inventory/actions');
var Items = require('./inventory/items');

var HeroInventory = React.createClass({
  mixins: [HeroListenerMixin],
  getInitialState: function() {
    return assign({
      filter: null
    }, HeroListenerMixin.getInitialState);
  },
  render: function() {
    var hero = this.state.hero;

    if (_.isEmpty(hero)) return null;

    var things = hero.things.filter(function(thing) {
      var filter = this.state.filter;
      return !thing.dressed && (!filter || thing.thing.type === filter);
    }.bind(this));

    debug('render');

    return (
      <div>
        <Actions
          hero={hero}
          filterHandler={this._filterHandler} />
        <Items
          hero={hero}
          things={things} />
      </div>
    );
  },
  _filterHandler: function(type) {
    this.setState({
      filter: type
    });
  }
});

module.exports = HeroInventory;
