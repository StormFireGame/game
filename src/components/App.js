import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetch as fetchHero, receive as receiveHero } from '../actions/heroActions';
import mediator, { fechStorage } from '../mediator';

import { INIT_LOAD, RELOAD } from '../constants/AppConstants';

import Header from './Header';
import Footer from './Footer';
import Messages from './Messages';

class App extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  state = {
    loading: true,
  };

  componentDidMount() {
    FB.getLoginStatus((res) => {
      if (res.status === 'connected') {
        this.initLoad();
      } else {
        this.setState({
          loading: false,
        });
      }
    });

    mediator.on(INIT_LOAD, ::this.initLoad);
    mediator.on(RELOAD, ::this.reload);
  }

  getStyles() {
    return {
      base: {
        // backgroundColor: '#F5F5F5',
        height: '100%',
        minWidth: 960,
      },
    };
  }

  initLoad() {
    const { dispatch } = this.props;

    fechStorage()
      .then(() => {
        fetchHero()
          .then((data) => {
            dispatch(receiveHero(data));
            this.state.loading = false;
            this.reload();
          });
      });
  }

  reload() {
    this.context.router.replace('/');
  }

  render() {
    const styles = this.getStyles();
    const { loading } = this.state;

    return (
      <div style={styles.base}>
        {loading ? <div>Loading...</div> :
          <div className="uk-container uk-container-center">
            {mediator.loggedInHero ? <Header /> : null}
            <div>
              {this.props.children}
            </div>
          </div>}
        <Footer />
        <Messages />
      </div>
    );
  }
}

export default connect()(App);
