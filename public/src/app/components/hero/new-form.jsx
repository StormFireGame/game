import React from 'react';
import {
  RadioButtonGroup,
  TextField,
  RaisedButton,
  RadioButton
} from 'material-ui';
import Router from 'react-router';
import debugLib from '../../lib/debug';

import utils from '../../lib/utils';
import mediator from '../../mediator';
import actionTypes from '../../constants/action-types';

import HeroService from '../../services/hero-service';

const debug = debugLib('components:hero:new-form');

export default class HeroNewForm extends React.Component {
  state = {
    errors: {}
  };

  render() {
    const errors = this.state.errors;

    debug('render');

    return (
      <form onSubmit={::this._onSubmit}>
        <TextField
          ref="login"
          name="login"
          required={true}
          errorText={errors.login}
          hintText="Login" />
        <br />
        <TextField
          ref="password"
          type="password"
          name="password"
          required={true}
          errorText={errors.password}
          hintText="Password" />
        <br />
        <TextField
          ref="email"
          type="email"
          required={true}
          errorText={errors.email}
          hintText="Email"  />
        <br />

        <label>Sex:</label>
        <RadioButtonGroup
          name="sex"
          ref="sex"
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
  _onSubmit(e) {
    e.preventDefault();

    const refs = this.refs;
    const data = {
      login: refs.login.getValue(),
      password: refs.password.getValue(),
      email: refs.email.getValue(),
      sex: refs.sex.getSelectedValue()
    };

    debug('submit %o', data);

    HeroService.new(data)
      .then(() => {
        mediator.emit(actionTypes.MESSAGE, 'Hero created');
        this.transitionTo('/');
      }, (res) => {
        if (res.status === 422) {
          this.setState({
            errors: utils.validationMapper(res.body)
          });
        }
      });
  }
}
