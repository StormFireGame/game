import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import _ from 'lodash';

import debugLib from '../../../lib/debug';

import HeroService from '../../../services/hero-service';
import mediator from '../../../mediator';
import actionTypes from '../../../constants/action-types';

const debug = debugLib('components:hero:preferences:security-form');

export default class HeroPreferencesGeneralForm extends React.Component {
  state = { errors: {} };

  render() {
    const errors = this.state.errors;
    debug('render');

    return (
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
    );
  }
  _validate() {
    const refs = this.refs;
    const newPassword = refs.newPassword.getValue();
    const repeateNewPassword = refs.repeateNewPassword.getValue();
    const errors = {};

    if (newPassword !== repeateNewPassword) {
      errors.repeateNewPassword = 'Repeate password doesn\'t match';
    }

    return errors;
  }
  _onSubmit(e) {
    e.preventDefault();

    const refs = this.refs;
    const errors = this._validate();

    if (!_.isEmpty(errors)) {
      this.setState({
        errors: errors
      });
      return;
    }

    const data = {
      password: refs.password.getValue(),
      newPassword: refs.newPassword.getValue()
    };

    HeroService.changePassword(data)
      .then(() => {
        mediator.emit(actionTypes.MESSAGE, 'Password changed');
        this.setState({
          errors: {}
        });
      }, (res) => {
        if (res.status === 422) {
          this.setState({
            errors: {
              password: 'Wrong password'
            }
          });
        }
      });
  }
}
