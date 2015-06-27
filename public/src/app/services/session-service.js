import fetch from '../lib/fetch';
import store from 'store';
import mediator from '../mediator';

import debugLib from '../lib/debug';

const debug = debugLib('services:session');

export default {
  new(data) {
    data = {
      'grant_type': 'password',
      'client_id': 'test',
      'client_secret': 'test',
      username: data.login,
      password: data.password
    };

    debug('new request %o', data);

    return fetch('/oauth/token', {
      method: 'POST',
      body: data
    }).then((response) => {
      const accessToken = response.access_token;

      if (accessToken) {
        store.set('accessToken', accessToken);
        debug('get access token %s', accessToken);

        mediator.accessToken = accessToken;
      }
    });
  }
};
