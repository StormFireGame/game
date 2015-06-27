import React from 'react';
import { RouteHandler } from 'react-router';
import mui from 'material-ui';

import Header from '../components/header';
import Footer from '../components/footer';
import Messages from '../components/messages';
import Chat from '../components/chat/index';

import debugLib from '../lib/debug'

const debug = debugLib('pages:master');

const ThemeManager = new mui.Styles.ThemeManager();

export default class Master extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    let container;
    const router = this.context.router;
    const inside = !router.isActive('/heroes/new') && !router.isActive('/');

    debug('master render %s', router.getCurrentPath());

    if (inside) {
      container = (
        <div>
          <Header />
          <div className="main-wrapper">
            <RouteHandler {...this.props} />
          </div>
        </div>
      );
    } else {
      container = (
        <RouteHandler {...this.props} />
      );
    }

    return (
      <div>
        <div className='container'>
          {container}
          <div className="push" />
        </div>
        {(inside) ?
          <div className="chat-wrapper">
            <Chat />
          </div> : null}
        <Footer />
        <Messages />
      </div>
    );
  }
}
