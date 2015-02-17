var React = require('react');
var mui = require('material-ui');
var debug = require('debug')('game:components:info');

var HeroStore = require('../stores/hero');

var FontIcon = mui.FontIcon;

function getInfoState() {
  return {
    money: HeroStore.get().money
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
  },
  _onChange: function() {
    this.setState(getInfoState());
  },
  render: function() {
    debug('render');

    if (!this.state.money) return null;

    return (
      <div id="info">
        <FontIcon className="mdfi_action_account_balance_wallet" />
        {this.state.money}
      </div>
    );
  }
});

module.exports = Info;
