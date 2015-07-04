import fetch from '../lib/fetch';
import debugLib from '../lib/debug';

const debug = debugLib('services:island');

export default {
  fetch() {
    debug('fetching request');

    return fetch('/island')
      .then((response) => {
        debug('fetched');

        return response;
      });
  }
};
