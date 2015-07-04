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
    HeroStore.addChangeListener(this.onChange);
  },
  componentWillUnmount() {
    HeroStore.removeChangeListener(this.onChange);
  },
  onChange() {
    this.setState(getHeroState());
  }
};

module.exports = HeroListenerMixin;
