import React, { Component } from 'react';

import Actions from './inventory/Actions';
import Items from './inventory/Items';

export default class extends Component {
  state = { filter: null };
  render() {
    return (
      <div>
        <Actions onFilter={value => this.setState({ filter: value })} />
        <Items filter={this.state.filter} />
      </div>
    );
  }
}
