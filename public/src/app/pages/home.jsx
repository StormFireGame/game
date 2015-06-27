import React from 'react';
import debugLib from '../lib/debug';

import SessionNewForm from '../components/session/new-form';

const debug = debugLib('pages:home');

export default class HomePage extends React.Component {
  render() {
    debug('render');

    return (
      <div className="middle">
        <div className="logo" />
        <SessionNewForm />
      </div>
    );
  }
}
