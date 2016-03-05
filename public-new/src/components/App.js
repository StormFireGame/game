import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from '../assets/img/logo.png';

class App extends Component {
  render() {
    return (
      <div>
        <img style={{ width: 50, height: 50 }} src={Logo} />
        { this.props.children }
      </div>
    );
  }
}

function select(state) {
  return {
    data: state,
  };
}

export default connect(select)(App);
