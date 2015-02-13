var React = require('react');
var mui = require('material-ui');

var FontIcon = mui.FontIcon;

var Info = React.createClass({
  render: function() {
    return (
      <div id="info">
        <FontIcon className="mdfi_action_account_balance_wallet" /> 200.0
      </div>
    );
  }
});

module.exports = Info;
