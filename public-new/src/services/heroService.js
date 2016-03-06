import mediator from '../mediator';
import db from '../lib/db';
import debugLib from '../lib/debug';

const debug = debugLib('heroService');

export default {
  me() {
    return new Promise((resolve) => {
      FB.api('/me', {
        fields: 'email,gender,name',
      }, (res) => {
        const ref = db.ref.child('heroes');

        if (!ref[res.id]) {
          ref.set({
            [res.id]: res,
          });
        }
        mediator.currentHero = res;

        debug('Hero ', mediator.currentHero);

        resolve();
      });
    });
  },
};
