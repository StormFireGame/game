import mediator from '../mediator';
import db from '../lib/db';
import debugLib from '../lib/debug';

import heroHelper from '../helpers/heroHelper';

const debug = debugLib('services:hero');

export default {
  me() {
    return new Promise((resolve) => {
      FB.api('/me', {
        fields: 'email,gender,name',
      }, (res) => {
        const ref = db.ref.child('heroes');

        if (!ref[res.id]) {
          ref.set({
            [res.id]: heroHelper.init(res),
          });
        }
        mediator.hero = res;

        debug('Hero ', mediator.hero);

        resolve();
      });
    });
  },
};
