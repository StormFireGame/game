import fetch from '../lib/fetch';
import debugLib from '../lib/debug';

const debug = debugLib('services:hero-image');

module.exports = {
  fetch() {
    debug('fetching request');

    return fetch('/hero-images')
      .then((response) => {
        debug('fetched');
        return response;
      });
  }
};
