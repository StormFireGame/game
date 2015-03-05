var React = require('react');
var debug = require('debug')('game:pages:hero:show');
var _ = require('lodash');

var HeroApi = require('../../utils/hero-api');
var SkillApi = require('../../utils/skill-api');
var HeroStore = require('../../stores/hero-store');
var AuthMixin = require('../mixins/auth');

var HeroBody = require('../../components/hero/body');
var HeroInfo = require('../../components/hero/info');

function getHeroState() {
  return {
    hero: HeroStore.get()
  };
}

var HeroShowPage = React.createClass({
  mixins: [AuthMixin],
  getInitialState: function() {
    return getHeroState();
  },
  componentDidMount: function() {
    HeroApi.fetch();
    SkillApi.fetch();

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
      <div id="hero-show">
        <section className="body-wrapper">
          <HeroBody hero={hero} />
        </section>
        <section className="info-wrapper">
          <HeroInfo hero={hero} />
        </section>
      </div>
    );
  }
});

module.exports = HeroShowPage;
