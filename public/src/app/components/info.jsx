var React = require('react'),
    mui = require('material-ui'),

    Icon = mui.Icon;

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
