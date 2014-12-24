  'use strict';

  var React = require('react'),
      mui = require('material-ui'),
      Router = require('react-router'),
      utils = require('../../lib/utils'),
      mediator = require('../../mediator'),
      actionTypes = require('../../constants/action-types'),

      HeroesService = require('../../services/heroes'),

      RadioButtonGroup = require('../radio-button-group.jsx'),

      Input = require('../../../../../../material-ui/src/js/input.jsx'),
      // Input = mui.Input,
      RaisedButton = mui.RaisedButton,
      RadioButton = mui.RadioButton,

      Navigation = Router.Navigation,
      Toast = mui.Toast;

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
