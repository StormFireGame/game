var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var debug = require('debug')('game:components:sessions:new-form');

var SessionsService = require('../../services/sessions');

var Navigation = Router.Navigation;

var Input = mui.Input;
var RaisedButton = mui.RaisedButton;

var SessionsNewForm = React.createClass({
  mixins: [Navigation],
  getInitialState: function() {
    return {
      error: null
    };
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

    SessionsService.new(data)
      .then(function(res) {
        if (res.error) {
          this.setState({
            error: res['error_description']
          });
        }
      }.bind(this));
  },
  render: function() {
    var error = this.state.error;
    this.state.error = null;

    debug('render');

    return (
      <form onSubmit={this._onSubmit}>
        <Input ref="login" error={error} type="text" name="login" placeholder="Login" />
        <Input ref="password" type="password" name="password" placeholder="Password" />
        <RaisedButton label="Signin" />
        <RaisedButton href="#/heroes/new" label="Signup" className="pull-right" primary={true} linkButton={true} />
      </form>
    );
  }
});

module.exports = SessionsNewForm;
