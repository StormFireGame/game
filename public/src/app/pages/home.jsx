import React from 'react';
import debugLib from '../lib/debug';

import SessionNewForm from '../components/session/new-form';

const debug = debugLib('pages:home');

export default class HomePage extends React.Component {
  getStyle() {
    return {
      base: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      },
      logo: {
        backgroundImage: 'url(../images/logo.png)',
        width: 256,
        height: 256,
        margin: '0 auto'
      }
    };
  }
  render() {
    const style = this.getStyle();
    debug('render');

    return (
      <div style={style.base}>
        <div style={style.logo} />
        <SessionNewForm />
      </div>
    );
  }
}
