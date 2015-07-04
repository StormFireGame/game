import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import debugLib from '../../lib/debug';

import SessionService from '../../services/session-service';

const debug = debugLib('components:session:new-form');

export default class SessionNewForm extends React.Component {
  state = { error: null };

  static contextTypes = {
    router: React.PropTypes.func
  };

  render() {
    const error = this.state.error;

    debug('render');

    return (
      <form onSubmit={::this.handleSubmit}>
        <TextField
          ref="login"
          errorText={error}
          name="login"
          required={true}
          hintText="Login" />
        <br />
        <TextField
          ref="password"
          type="password"
          name="password"
          required={true}
          hintText="Password" />
        <br />
        <RaisedButton label="Signin" />
        <RaisedButton
          style={{ float: 'right' }}
          href="#/heroes/new"
          label="Signup"
          primary={true}
          linkButton={true} />
      </form>
    );
  }
  handleSubmit(e) {
    e.preventDefault();

    const router = this.context.router;
    const refs = this.refs;
    const data = {
      login: refs.login.getValue(),
      password: refs.password.getValue()
    };

    debug('submit %o', data);

    SessionService.new(data)
      .then((res) => {
        if (res.error) {
          this.setState({
            error: res.errordescription
          });
        }

        router.transitionTo('hero');
      });
  }
}
