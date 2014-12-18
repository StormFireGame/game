  'use strict';

  var React = require('react'),
      mui = require('material-ui'),

      HeroesService = require('../../services/heroes'),

      RadioButtonGroup = require('../radio-button-group.jsx'),

      Input = mui.Input,
      RaisedButton = mui.RaisedButton,
      RadioButton = mui.RadioButton;

  var HeroesNewForm = React.createClass({
    _onSubmitTouchTap: function() {
      var refs = this.refs,
          data;

      data = {
        login: refs.login.getValue(),
        password: refs.password.getValue(),
        email: refs.email.getValue(),
        sex: refs.sex.getValue()
      };

      HeroesService.new(data)
        .fail();
    },
    render: function() {
      return (
        <form>
          <Input ref="login" type="text" name="login" placeholder="Login" />
          <Input ref="password" type="password" name="password" placeholder="Password" />
          <Input ref="email" type="text" name="email" placeholder="Email" />
          <div>
            <label class="mui-font-style-body-1">Sex:</label>
            <br />
            <RadioButtonGroup ref="sex">
              <RadioButton name="sex" value="male" label="Male" defaultChecked="true" />
              <RadioButton name="sex" value="female" label="Female" />
            </RadioButtonGroup>
          </div>
          <br />
          <RaisedButton type="button" label="Signup" onTouchTap={this._onSubmitTouchTap} />
        </form>
      );
    }
  });

  module.exports = HeroesNewForm;
