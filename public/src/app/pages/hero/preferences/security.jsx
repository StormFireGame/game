import React from 'react';
import debugLib from '../../../lib/debug';
import Form from '../../../components/hero/preferences/security-form';

const debug = debugLib('pages:hero:preferences:security');

export default class HeroPreferencesSecurityPage extends React.Component {

  render() {
    debug('render');

    return (
      <div>
        <h3>Security</h3>
        <Form />
      </div>
    );
  }
}
