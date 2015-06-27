import React from 'react';

import IslandApi from '../utils/island-api';
import Island from '../components/island';

import debugLib from '../lib/debug';

const debug = debugLib('pages:island');

export default class IslandPage extends React.Component {
  // TODO: mixins: [AuthMixin],
  componentDidMount() {
    IslandApi.fetch();
  }
  render() {
    debug('render');

    return (
      <div id="island">
        <Island />
      </div>
    );
  }
}
