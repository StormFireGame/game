import HeroStore from '../../../stores/hero-store';

function getHeroState() {
  return {
    hero: HeroStore.get()
  };
}

var HeroListenerMixin = {
  getInitialState() {
    return getHeroState();
  },
  componentDidMount() {
    HeroStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    HeroStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    this.setState(getHeroState());
  }
};

module.exports = HeroListenerMixin;
