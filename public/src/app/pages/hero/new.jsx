import React from 'react';
import Form from '../../components/hero/new-form';
import debugLib from '../../lib/debug';

const debug = debugLib('pages:hero:new');

export default class HeroNewPage extends React.Component {
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
        <h2>Signup</h2>
        <Form />
      </div>
    );
  }
}
