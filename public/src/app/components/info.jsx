var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');

var debug = require('debug')('game:components:info');

var HeroStore = require('../stores/hero-store');

var FontIcon = mui.FontIcon;

function getInfoState() {
  return {
    hero: HeroStore.get(),
    currentHp: 0
  };
}

var Info = React.createClass({
  getInitialState: function() {
    return getInfoState();
  },
  componentDidMount: function() {
    HeroStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    HeroStore.removeChangeListener(this._onChange);
    window.clearInterval(this._setHpInterval);
  },
  _onChange: function() {
    this.setState(getInfoState());

    this._setHpInterval = window.setInterval(this._setHp, 1000);
  },
  _setHp: function() {
    var hp = this.state.hero.feature.hp;

    var time = new Date().getTime();
    var delay = 1000;

    hp.current = Number(hp.current);
    hp.time = new Date(hp.time).getTime();
    hp.max = Number(hp.max);

    if (hp.current === hp.max || this.state.currentHp === hp.max) {
      debug('hp max %s', hp.max);
      window.clearInterval(this._setHpInterval);
      return;
    }

    hp.current += ((time - hp.time) / 1000) / (delay / hp.max);

    if (hp.current > hp.max) hp.current = hp.max;

    hp.current = parseInt(hp.current);
    if (hp.current === this.state.currentHp) return;

    this.setState({
      currentHp: hp.current
    });
  },
  render: function() {
    var hero = this.state.hero;

    // TODO change lodash to modules
    if (_.isEmpty(hero)) return null;

    var hp = hero.feature.hp;

    debug('render');

    return (
      <div id="info">
        <h5 className="text-center">
          <FontIcon
            className="mdfi_action_info" />
          &nbsp;
          {hero.login} [{hero.level}]
        </h5>
        <FontIcon
          className="mdfi_action_favorite" />
        &nbsp;
        {this.state.currentHp}/{hp.max}
        &nbsp;
        <FontIcon
          className="mdfi_action_account_balance_wallet" />
        &nbsp;
        {hero.money}
      </div>
    );
  }
});

module.exports = Info;
