import SessionHelper from '../../helpers/session-helper';
import HeroApi from '../../utils/hero-api';

import debugLib from '../../lib/debug';

const debug = debugLib('pages:decorators:auth');

export default (target) => {
  target.willTransitionTo = (transition) => {
    if (!SessionHelper.isSignin()) {
      transition.abort();
      debug('access closed %s', transition.path);
      transition.redirect('/');
    } else {
      HeroApi.fetch();
    }
  };
};
