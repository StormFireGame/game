var HeroStore = require('../../../stores/hero-store');

function getHeroState() {
  return {
    hero: HeroStore.get()
  };
}

var HeroListenerMixin = {
  getInitialState: function() {
    return getHeroState();
  },
  componentDidMount: function() {
    HeroStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    HeroStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getHeroState());
  }
};

module.exports = HeroListenerMixin;
