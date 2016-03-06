import React, { Component, PropTypes } from 'react';
import heroService from '../services/heroService';

export default class extends Component {
  static contextTypes = {
    router: PropTypes.func.isRequired,
  };

  onSignIn() {
    FB.login(() => {
      heroService.me()
        .then(this.context.router.replace.bind(this, '/'));
    }, { scope: 'public_profile, email' });
  }
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <button
          onClick={::this.onSignIn}
          type="button"
          className="uk-width-1-1 uk-button uk-button-large uk-button-primary">Sign In With Facebook</button>
      </div>
    );
  }
}
