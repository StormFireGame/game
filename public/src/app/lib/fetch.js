import debugLib from '../lib/debug';

import config from '../config/application';
import environmentConfig from '../config/environment';

import mediator from '../mediator';
import actionTypes from '../constants/action-types';

const debug = debugLib('lib:superagent');

export default (url, options = {}) => {
  const accessToken = mediator.accessToken;

  options.headers = options.headers || {};

  if (options.body) options.body = JSON.stringify(options.body);
  if (options.method !== 'DELETE') options.headers.Accept = 'application/json';
  if (accessToken) options.headers.Authorization = 'Bearer ' + accessToken;

  options.headers['Content-Type'] = 'application/json';

  if (url.charAt(0) === '/') {
    url = environmentConfig[config.environment].api.root + url;
  }

  function status(res) {
    if (res.status >= 200 && res.status < 300) return Promise.resolve(res.data);

    debug('res with error %s %o', res.status, res);

    if (res.status === 401) mediator.emit(actionTypes.UNAUTHORIZED);
    if (res.status === 422) return Promise.reject(res);

    return Promise.reject(new Error(res.statusText));
  }

  function json(res) {
    if (res.status === 204) return res;

    return new Promise((resolve) => {
      res.json()
        .then((data) => {
          res.data = data;
          resolve(res);
        });
    });
  }

  return fetch(url, options)
    .then(json)
    .then(status);
};
