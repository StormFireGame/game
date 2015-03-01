var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:pages:hero:preferences:security');

var Form = require('../../../components/hero/preferences/security-form');

var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

var HeroPreferencesSecurityPage = React.createClass({
  render: function() {

    debug('render');

    return (
      <div>
        <h3>Security</h3>
        <Form />
      </div>
    );
  }
});

module.exports = HeroPreferencesSecurityPage;
