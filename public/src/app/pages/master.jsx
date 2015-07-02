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

  getStyle() {
    return {
      main: {
        position: 'relative'
      },
      chat: {
        position: 'fixed',
        bottom: 55,
        left: 10,
        right: 10,
        minWidth: 960
      },
      container: {
        maxWidth: 960,
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        paddingBottom: 60
      }
    }
  }

  render() {
    let container;
    const router = this.context.router;
    const inside = !router.isActive('/heroes/new') && !router.isActive('/');
    const style = this.getStyle();

    debug('master render %s', router.getCurrentPath());

    if (inside) {
      container = (
        <div>
          <Header />
          <div style={style.main}>
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
        <div style={style.container}>
          {container}
        </div>
        {(inside) ?
          <div style={style.chat}>
            <Chat />
          </div> : null}
        <Footer />
        <Messages />
      </div>
    );
  }
}
