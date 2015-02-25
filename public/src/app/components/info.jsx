var React = require('react');
var mui = require('material-ui');
var moment = require('moment');
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
    var [currentHp, maxHp, currentTimeHp] =
      this.state.hero.feature.hp.split('|');
    var time = moment().valueOf();
    var delay = 1000;

    currentHp = Number(currentHp);
    currentTimeHp = Number(currentTimeHp);
    maxHp = Number(maxHp);

    if (currentHp === maxHp || this.state.currentHp === maxHp) {
      debug('hp max %s', maxHp);
      window.clearInterval(this._setHpInterval);
      return;
    }

    currentHp += ((time - currentTimeHp) / 1000) / (delay / maxHp);

    if (currentHp > maxHp) currentHp = maxHp;

    currentHp = parseInt(currentHp);
    if (currentHp === this.state.currentHp) return;

    this.setState({
      currentHp: currentHp
    });
  },
  render: function() {
    var hero = this.state.hero;

    if (_.isEmpty(hero)) return null;

    var [currentHp, maxHp] = hero.feature.hp.split('|');

    debug('render');

    return (
      <div id="info">
        <h5 className="text-center">
          <FontIcon className="mdfi_action_info" /> {hero.login} [{hero.level}]
        </h5>
        <FontIcon className="mdfi_action_favorite" /> {this.state.currentHp}/{maxHp}
        &nbsp;
        <FontIcon className="mdfi_action_account_balance_wallet" /> {hero.money}
      </div>
    );
  }
});

module.exports = Info;
