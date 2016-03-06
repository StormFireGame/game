import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <div>
        Hero
        <a onClick={() => FB.logout()}>Signout</a>
      </div>
    );
  }
}
