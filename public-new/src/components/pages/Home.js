import React, { Component } from 'react';
import Logo from '../../assets/img/logo.png';
import SignIn from '../SignIn';

export default class extends Component {
  getStyles() {
    return {
      base: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
      logo: {
        width: 256,
        height: 256,
        margin: '0 auto',
      },
    };
  }
  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.base}>
        <img style={styles.logo} src={Logo} />
        <SignIn />
      </div>
    );
  }
}
