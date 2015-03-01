var React = require('react');
var mui = require('material-ui');
var Router = require('react-router');
var debug = require('debug')('game:components:hero:new-form');

var utils = require('../../lib/utils');
var mediator = require('../../mediator');
var actionTypes = require('../../constants/action-types');

var HeroService = require('../../services/hero-service');

var RadioButtonGroup = mui.RadioButtonGroup;

var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var RadioButton = mui.RadioButton;

var Navigation = Router.Navigation;
var Toast = mui.Toast;

var HeroNewForm = React.createClass({
  mixins: [Navigation],
  getInitialState: function() {
    return {
      errors: {}
    };
  },
  _onSubmit: function(e) {
    var refs = this.refs;
    var data;

    e.preventDefault();

    data = {
      login: refs.login.getValue(),
      password: refs.password.getValue(),
      email: refs.email.getValue(),
      sex: refs.sex.getSelectedValue()
    };

    debug('submit %o', data);

    HeroService.new(data)
      .then(function() {
        mediator.emit(actionTypes.MESSAGE, 'Hero created');
        this.transitionTo('/');
      }.bind(this), function(res) {
        if (res.status === 422) {
          this.setState({
            errors: utils.validationMapper(res.body)
          });
        }
      }.bind(this));
  },
  render: function() {
    var errors = this.state.errors;

    debug('render');

    return (
      <form onSubmit={this._onSubmit}>
        <TextField
          ref="login"
          name="login"
          required
          errorText={errors.login}
          hintText="Login" />
        <br />
        <TextField
          ref="password"
          type="password"
          name="password"
          required
          errorText={errors.password}
          hintText="Password" />
        <br />
        <TextField
          ref="email"
          type="email"
          required
          errorText={errors.email}
          hintText="Email"  />
        <br />

        <label>Sex:</label>
        <RadioButtonGroup
          ref="sex"
          name="sex"
          defaultSelected="male">
            <RadioButton
              value="male"
              label="Male" />
            <RadioButton
              value="female"
              label="Female" />
        </RadioButtonGroup>
        <br />

        <RaisedButton label="Signup" />
      </form>
    );
  }
});

module.exports = HeroNewForm;
