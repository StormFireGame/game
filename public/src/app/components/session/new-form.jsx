import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import debugLib from '../../lib/debug';

import SessionService from '../../services/session-service';

const debug = debugLib('components:session:new-form');

export default class SessionNewForm extends React.Component {
  // mixins: [Navigation],
  state = {
    error: null
  };

  render() {
    const error = this.state.error;

    debug('render');

    return (
      <form onSubmit={this._onSubmit}>
        <TextField
          ref="login"
          errorText={error}
          name="login"
        import
          hintText="Login" />
        <br />
        <TextField
          ref="password"
          type="password"
          name="password"
        import
          hintText="Password" />
        <br />
        <RaisedButton label="Signin" />
        <RaisedButton
          href="#/heroes/new"
          label="Signup"
          className="pull-right"
          primary={true}
          linkButton={true} />
      </form>
    );
  }
  _onSubmit(e) {
    var refs = this.refs;
    var data;

    e.preventDefault();

    data = {
      login: refs.login.getValue(),
      password: refs.password.getValue(),
    };

    debug('submit %o', data);

    SessionService.new(data)
      .then((res) => {
        if (res.error) {
          this.setState({
            error: res.error_description
          });
        }

        this.transitionTo('hero');
      });
  }
}
