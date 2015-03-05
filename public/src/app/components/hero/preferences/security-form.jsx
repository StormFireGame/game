var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');

var debug = require('debug')('game:components:hero:preferences:security-form');

var HeroService = require('../../../services/hero-service');
var mediator = require('../../../mediator');
var actionTypes = require('../../../constants/action-types');

var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

var HeroPreferencesGeneralForm = React.createClass({
  getInitialState: function() {
    return {
      errors: {}
    };
  },
  _validate: function() {
    var refs = this.refs;
    var newPassword = refs.newPassword.getValue();
    var repeateNewPassword = refs.repeateNewPassword.getValue();
    var errors = {};

    if (newPassword !== repeateNewPassword) {
      errors.repeateNewPassword = 'Repeate password doesn\'t match';
    }

    return errors;
  },
  _onSubmit: function(e) {
    e.preventDefault();

    var refs = this.refs;
    var data;
    var errors = this._validate();

    if (!_.isEmpty(errors)) {
      this.setState({
        errors: errors
      });
      return;
    }

    data = {
      password: refs.password.getValue(),
      newPassword: refs.newPassword.getValue()
    };

    HeroService.changePassword(data)
      .then(function() {
        mediator.emit(actionTypes.MESSAGE, 'Password changed');
        this.setState({
          errors: {}
        });
      }.bind(this), function(res) {
        if (res.status === 422) {
          this.setState({
            errors: {
              password: 'Wrong password'
            }
          });
        }
      }.bind(this));
  },
  render: function() {
    var errors = this.state.errors;
    debug('render');

    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <TextField
            type="password"
            ref="password"
            name="password"
            errorText={errors.password}
            required
            hintText="Password" />
          <br />
          <TextField
            type="password"
            ref="newPassword"
            name="new-password"
            required
            hintText="New password" />
          <br />
          <TextField
            type="password"
            ref="repeateNewPassword"
            name="repeate-new-password"
            required
            errorText={errors.repeateNewPassword}
            hintText="Repeat new password" />
          <br />
          <br />
          <RaisedButton label="Save" />
        </form>
      </div>
    );
  }
});

module.exports = HeroPreferencesGeneralForm;
