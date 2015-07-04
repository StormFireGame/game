import React from 'react';

import IslandApi from '../utils/island-api';
import Island from '../components/island';
import SessionHelper from '../helpers/session-helper';
import HeroApi from '../utils/hero-api';

import debugLib from '../lib/debug';

const debug = debugLib('pages:island');

function auth(target) {
  target.willTransitionTo = function(transition) {
    if (!SessionHelper.isSignin()) {
      transition.abort();
      debug('access closed %s', transition.path);
      transition.redirect('/');
    } else {
      HeroApi.fetch();
    }
  };
}

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
