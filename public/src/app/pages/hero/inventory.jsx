var React = require('react');
var debug = require('debug')('game:pages:hero:inventory');

var HeroStore = require('../../stores/hero-store');

var AuthMixin = require('../mixins/auth');

var HeroBody = require('../../components/hero/body');
var HeroInventory  = require('../../components/hero/inventory');

var HeroInventoryPage = React.createClass({
  mixins: [AuthMixin],
  getInitialState: function() {
    return {
      hero: HeroStore.get()
    };
  },
  render: function() {
    var hero = this.state.hero;

    debug('render');

    return (
      <div id="hero-inventory">
        <section className="body-wrapper">
          <HeroBody hero={hero} />
        </section>
        <section className="inventory-wrapper">
          <HeroInventory things={hero.things} />
        </section>
      </div>
    );
  }
});

module.exports = HeroInventoryPage;
