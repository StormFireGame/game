var React = require('react');
var debug = require('debug')('game:pages:heroes:show');
var _ = require('lodash');

var HeroApi = require('../../utils/hero-api');
var HeroStore = require('../../stores/hero');

var HeroesBody = require('../../components/heroes/body');
var HeroesInfo = require('../../components/heroes/info');

function getHeroState() {
  return {
    hero: HeroStore.get()
  };
}

var HeroesShowPage = React.createClass({
  getInitialState: function() {
    return getHeroState();
  },
  componentDidMount: function() {
    HeroApi.fetch();

    HeroStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    HeroStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getHeroState());
  },
  render: function() {
    debug('render');

    if (_.isEmpty(this.state.hero)) return null;

    return (
      <div id="heroes-show">
        <section className="body-wrapper">
          <HeroesBody hero={this.state.hero} />
        </section>
        <section className="info-wrapper">
          <HeroesInfo hero={this.state.hero} />
        </section>
      </div>
    );
  }
});

module.exports = HeroesShowPage;
