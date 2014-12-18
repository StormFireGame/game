'use strict';

var React = require('react'),
    Router = require('react-router'),
    mui = require('material-ui'),

    Navigation = Router.Navigation,

    Input = mui.Input,
    RaisedButton = mui.RaisedButton;

var SessionsNewForm = React.createClass({
  mixins: [Navigation],
  _onHeroesNewTouchTap: function() {
    this.transitionTo('/heroes/new');
  },
  render: function() {
    return (
      <form>
        <Input ref="login" type="text" name="login" placeholder="Login" />
        <Input ref="Password" type="password" name="password" placeholder="Password" />
        <RaisedButton label="Signin" />
        <RaisedButton type="button" label="Signup" onTouchTap={this._onHeroesNewTouchTap} className="pull-right" primary={true} />
      </form>
    );
  }
});

module.exports = SessionsNewForm;
