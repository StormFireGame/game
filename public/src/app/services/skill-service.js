import fetch from '../lib/fetch';
import debugLib from '../lib/debug'

const debug = debugLib('services:skill');

export default {
  fetch() {
    debug('fetching request');

    return fetch('/skills')
      .then((response) => {
        debug('fetched');

        return response;
      });
  }
};
