import '../node_modules/uikit/dist/css/uikit.css';
import '../node_modules/uikit/dist/css/components/progress.css';

import './assets/css/main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import config from './config/index';
import routes from './routes';
import mediator from './mediator';

import { fetchHero } from './actions/AppActions';

import rootReducer from './reducers/rootReducer';
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const store = createStoreWithMiddleware(rootReducer);

// Make reducers hot reloadable, see http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
if (module.hot) {
  module.hot.accept('./reducers/rootReducer', () => {
    const nextRootReducer = require('./reducers/rootReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

function run() {
  ReactDOM.render(
    <Provider store={store}>
      {routes}
    </Provider>,
    document.getElementById('app')
  );
}

window.fbAsyncInit = () => {
  FB.init({
    appId: config.facebookAppId,
    cookie: true,
    xfbml: true,
    version: 'v2.5',
  });

  run();
};
