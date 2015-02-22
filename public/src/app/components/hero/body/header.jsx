var React = require('react');
var mui = require('material-ui');
var moment = require('moment');

var debug = require('debug')('game:components:hero:body-header');

var FontIcon = mui.FontIcon;

var HeroBodyHeader = React.createClass({
  getInitialState: function() {
    var [currentHp] = this.props.hp.split('|');

    return {
      hp: currentHp
    };
  },
  componentDidMount: function() {
    this._setHpInterval = window.setInterval(this._setHp, 1000);
  },
  componentWillUnmount: function() {
    window.clearInterval(this._setHpInterval);
  },
  _setHp: function() {
    var [currentHp, maxHp, currentTimeHp] = this.props.hp.split('|');
    var time = moment().valueOf();
    var delay = 1000;

    currentHp = Number(currentHp);
    currentTimeHp = Number(currentTimeHp);
    maxHp = Number(maxHp);

    if (currentHp === maxHp || this.state.hp === maxHp) {
      debug('hp max %s', maxHp);
      window.clearInterval(this._setHpInterval);
      return;
    }

    currentHp += ((time - currentTimeHp) / 1000) / (delay / maxHp);

    if (currentHp > maxHp) currentHp = maxHp;

    currentHp = parseInt(currentHp);
    if (currentHp === this.state.hp) return;

    this.setState({
      hp: currentHp
    });
  },
  render: function() {
    var [currentHp, maxHp] = this.props.hp.split('|');
    debug('render');

    return (
      <div>
        <div className="mui-font-style-title hero-title">
          <FontIcon className="mdfi_action_info" /> {this.props.login} [{this.props.level}]
        </div>
        <div className="mui-font-style-body-1 hero-indecators">
          {this.state.hp}/{maxHp}
        </div>
      </div>
    );
  }
});

module.exports = HeroBodyHeader;
