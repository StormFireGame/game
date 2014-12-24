'use strict';

var React = require('react'),
    Router = require('react-router'),
    mui = require('material-ui'),

    Navigation = Router.Navigation,

    Input = mui.Input,
    RaisedButton = mui.RaisedButton;

var SessionsNewForm = React.createClass({
  mixins: [Navigation],
  render: function() {
    return (
      <form>
        <Input ref="login" type="text" name="login" placeholder="Login" />
        <Input ref="Password" type="password" name="password" placeholder="Password" />
        <RaisedButton label="Signin" />
        <RaisedButton href="#/heroes/new" label="Signup" className="pull-right" primary={true} linkButton={true}/>
      </form>
    );
  }
});

module.exports = SessionsNewForm;
