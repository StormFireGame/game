var React = require('react');
var _ = require('lodash');
var debug = require('debug')('game:pages:hero:inventory');

var HeroApi = require('../../utils/hero-api');
var HeroStore = require('../../stores/hero-store');

var AuthMixin = require('../mixins/auth');

var HeroBody = require('../../components/hero/body');
var HeroInventory  = require('../../components/hero/inventory');

function getHeroState() {
  return {
    hero: HeroStore.get()
  };
}

var HeroInventoryPage = React.createClass({
  mixins: [AuthMixin],
  getInitialState: function() {
    return getHeroState();
  },
  componentDidMount: function() {
    HeroApi.fetch();

    // TODO: this should be in components not pages
    HeroStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    HeroStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getHeroState());
  },
  render: function() {
    var hero = this.state.hero;

    debug('render');

    if (_.isEmpty(hero)) return null;

    return (
      <div id="hero-inventory" className="row">
        <div className="col-md-4">
          <HeroBody actions={true} hero={hero} />
        </div>
        <div className="col-md-8">
          <HeroInventory hero={hero} />
        </div>
      </div>
    );
  }
});

module.exports = HeroInventoryPage;
