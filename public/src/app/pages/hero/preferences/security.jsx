var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:pages:hero:preferences:security');

var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

var HeroPreferencesSecurityPage = React.createClass({
  render: function() {

    debug('render');

    return (
      <div>
        <h3>Security</h3>
        <form>
          <TextField
            type="password"
            ref="password"
            name="password"
            hintText="Password" />
          <br />
          <TextField
            type="password"
            ref="new-password"
            name="new-password"
            hintText="New password" />
          <br />
          <TextField
            type="password"
            ref="repeate-new-password"
            name="repeate-new-password"
            hintText="Repeat new password" />
          <br />
          <RaisedButton label="Save" />
        </form>
      </div>
    );
  }
});

module.exports = HeroPreferencesSecurityPage;
