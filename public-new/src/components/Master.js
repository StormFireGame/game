import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import mediator from '../mediator';

import Header from './Header';
import Footer from './Footer';

class Master extends Component {
  static contextTypes = {
    router: PropTypes.func.isRequired,
  };

  getStyles() {
    return {
      base: {
        // backgroundColor: '#F5F5F5',
        height: '100%',
        minWidth: 960,
      },
    };
  }
  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.base}>
        <div className="uk-container uk-container-center">
          {mediator.hero ? <Header /> : null}
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}

function select(state) {
  return {
    data: state,
  };
}

export default connect(select)(Master);
