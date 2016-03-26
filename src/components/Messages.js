import React, { Component } from 'react';
import { MESSAGE } from '../constants/AppConstants';

import debugLib from '../lib/debug';

import mediator from '../mediator';

const debug = debugLib('messages');

export default class extends Component {
  state = { message: null };

  componentDidMount() {
    mediator.on(MESSAGE, ::this.setMessage);
  }
  componentWillUnmount() {
    mediator.removeListener(MESSAGE, ::this.setMessage);
  }

  onClose() {
    this.close();
  }

  setMessage(message) {
    debug('new message %s', message);

    this.setState({
      message,
    });

    setTimeout(::this.close, 5000);
  }

  close() {
    this.forceUpdate();
  }

  render() {
    const { message } = this.state;

    if (!message) return null;

    this.state.message = null;

    return (
      <div className="uk-position-bottom-left" style={{ width: '100%' }}>
        <div className="uk-alert uk-width-1-5 uk-margin-small-left">
          <a onClick={::this.onClose} className="uk-alert-close uk-close" />
          <p>{message}</p>
        </div>
      </div>
    );
  }
}
