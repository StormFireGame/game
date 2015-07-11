import React from 'react';

import IslandApi from '../utils/island-api';
import Island from '../components/island';
import auth from './decorators/auth';

import debugLib from '../lib/debug';

const debug = debugLib('pages:island');

@auth
export default class IslandPage extends React.Component {
  componentDidMount() {
    IslandApi.fetch();
  }
  render() {
    debug('render');

    return (
      <div>
        <Island />
      </div>
    );
  }
}
