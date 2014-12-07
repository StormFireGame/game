'use strict';

var React = require('react'),
    mui = require('material-ui'),

    Input = mui.Input,
    RaisedButton = mui.RaisedButton;

var SigninForm = React.createClass({
  render: function() {
    return (
      <form>
        <Input ref="login" type="text" name="login" placeholder="Login" />
        <Input ref="Password" type="password" name="password" placeholder="Password" />
        <RaisedButton label="Signin" />
      </form>
    );
  }
});

module.exports = SigninForm;
