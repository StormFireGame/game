var React = require('react');
var mui = require('material-ui');
var Router = require('react-router');
var debug = require('debug')('game:components:heroes:new-form');

var utils = require('../../lib/utils');
var mediator = require('../../mediator');
var actionTypes = require('../../constants/action-types');

var eroesService = require('../../services/heroes');

var RadioButtonGroup = require('../radio-button-group.jsx');

var Input = mui.Input;
var RaisedButton = mui.RaisedButton;
var RadioButton = mui.RadioButton;

var Navigation = Router.Navigation;
var Toast = mui.Toast;

var HeroesNewForm = React.createClass({
  mixins: [Navigation],
  getInitialState: function() {
    return {
      errors: {}
    };
  },
  _onSubmit: function(e) {
    var refs = this.refs,
        data;

    e.preventDefault();

    data = {
      login: refs.login.getValue(),
      password: refs.password.getValue(),
      email: refs.email.getValue(),
      sex: refs.sex.getValue()
    };

    debug('submit %o', data);

    HeroesService.new(data)
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
    this.state.errors = {};

    debug('render');

    return (
      <form onSubmit={this._onSubmit}>
        <Input ref="login" type="text" error={errors.login} name="login" placeholder="Login" />
        <Input ref="password" type="password" error={errors.password} name="password" placeholder="Password" />
        <Input ref="email" type="email" name="email" error={errors.email} placeholder="Email"  />
        <div>
          <label>Sex:</label>
          <br />
          <RadioButtonGroup ref="sex">
            <RadioButton name="sex" value="male" label="Male" defaultChecked={true} />
            <RadioButton name="sex" value="female" label="Female" />
          </RadioButtonGroup>
        </div>
        <br />
        <RaisedButton label="Signup" />
      </form>
    );
  }
});

module.exports = HeroesNewForm;
