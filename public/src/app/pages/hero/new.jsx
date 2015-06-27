import React from 'react';
import Form from '../../components/hero/new-form';
import debugLib from '../../lib/debug';

const debug = debugLib('pages:hero:new');

export default class HeroNewPage extends React.Component {
  render() {
    debug('render');

    return (
      <div className="middle">
        <div className="logo" />
        <h3>Signup</h3>
        <Form />
      </div>
    );
  }
}
