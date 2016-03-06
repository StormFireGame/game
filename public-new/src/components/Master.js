import React, { Component } from 'react';
import { connect } from 'react-redux';

import Footer from './Footer';

class Master extends Component {
  getStyles() {
    return {
      base: {
        backgroundColor: '#F5F5F5',
        height: '100%',
        minWidth: 960,
      },
    };
  }
  render() {
    return (
      <div style={this.getStyles().base}>
        { this.props.children }
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
