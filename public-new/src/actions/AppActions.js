import { HERO_INCREASE_PARAMETER, RECIEVE_HERO } from '../constants/AppConstants';

import mediator from '../mediator';

import heroHelper from '../helpers/heroHelper';

export function heroIncreaseParameter(name) {
  return { type: HERO_INCREASE_PARAMETER, name };
}

export function receiveHero(data) {
  return {
    type: RECIEVE_HERO,
    data,
  };
}

export function fetchHero() {
  return new Promise((resolve) => {
    FB.api('/me', {
      fields: 'email,gender,name',
    }, (res) => {
      const ref = mediator.db().child('heroes');

      if (!ref[res.id]) {
        ref.set({
          [res.id]: heroHelper.init(res),
        });
      }

      mediator.loggedInHero = true;

      resolve(res);
    });
  });
}
