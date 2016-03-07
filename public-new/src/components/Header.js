import React, { Component } from 'react';
import Menu from './Menu';
import Info from './Info';

export default class extends Component {
  render() {
    return (
      <div className="uk-grid">
        <div className="uk-width-4-10">
          <Info />
        </div>
        <div className="uk-width-6-10">
          <Menu />
        </div>
      </div>
    );
  }
}
