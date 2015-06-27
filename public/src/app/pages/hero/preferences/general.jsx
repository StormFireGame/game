import React from 'react';
import debugLib from '../../../lib/debug';
import Form from '../../../components/hero/preferences/general-form';

const debug = debugLib('pages:hero:preferences:general');

export default class HeroPreferencesGeneralPage extends React.Component {
  render() {
    debug('render');

    return (
      <div>
        <h3>General</h3>
        <Form />
      </div>
    );
  }
}
