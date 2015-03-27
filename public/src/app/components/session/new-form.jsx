var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var debug = require('debug')('game:components:session:new-form');

var SessionService = require('../../services/session-service');

var Navigation = Router.Navigation;

var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

var SessionNewForm = React.createClass({
  mixins: [Navigation],
  getInitialState: function() {
    return {
      error: null
    };
  },
  render: function() {
    var error = this.state.error;

    debug('render');

    return (
      <form onSubmit={this._onSubmit}>
        <TextField
          ref="login"
          errorText={error}
          name="login"
          required
          hintText="Login" />
        <br />
        <TextField
          ref="password"
          type="password"
          name="password"
          required
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
  },
  _onSubmit: function(e) {
    var refs = this.refs;
    var data;

    e.preventDefault();

    data = {
      login: refs.login.getValue(),
      password: refs.password.getValue(),
    };

    debug('submit %o', data);

    SessionService.new(data)
      .then(function(res) {
        if (res.error) {
          this.setState({
            error: res['error_description']
          });
        }

        this.transitionTo('hero');
      }.bind(this));
  }
});

module.exports = SessionNewForm;
