import React from 'react';
import debugLib from '../../lib/debug';

import SkillApi from '../../utils/skill-api';
import AuthMixin from '../mixins/auth';

import HeroBody from '../../components/hero/body';
import HeroInfo from '../../components/hero/info';

import SessionHelper from '../../helpers/session-helper';
import HeroApi from '../../utils/hero-api';

const debug = debugLib('pages:hero:show');

@auth
export default class HeroShowPage extends React.Component {
  componentDidMount() {
    SkillApi.fetch();
  }
  render() {
    debug('render');

    return (
      <div style={{
        display: 'flex',
        flexWrap: 'nowrap'
      }}>
        <div style={{
          flexBasis: 310,
          flexShrink: 0,
          flexGrow: 0
        }}>
          <HeroBody />
        </div>
        <div style={{
          flexGrow: 1,
          flexShrink: 0,
          marginLeft: 20
        }}>
          <HeroInfo />
        </div>
      </div>
    );
  }
}

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
