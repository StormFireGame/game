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

  function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }

    if (response.status === 401) mediator.emit(actionTypes.UNAUTHORIZED);

    debug('response with error %s %o', response.status, response);
    return Promise.reject(new Error(response.statusText));
  }

  function json(response) {
    if (response.status === 204) return;
    return response.json();
  }

  return fetch(url, options)
    .then(status)
    .then(json);
};
