var React = require('react');
var mui = require('material-ui');

var Icon = mui.Icon;

var Info = React.createClass({
  render: function() {
    return (
      <div id="info">
        <Icon icon="action-account-balance-wallet" /> 200.0
      </div>
    );
  }
});

module.exports = Info;
