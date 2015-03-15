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
      <div className="row">
        <div className="col-md-4">
          <HeroBody hero={hero} />
        </div>
        <div className="col-md-8">
          <HeroInfo hero={hero} />
        </div>
      </div>
    );
  }
});

module.exports = HeroShowPage;
