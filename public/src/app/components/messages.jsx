import React from 'react';
import { Snackbar } from 'material-ui';
import _ from 'lodash';
import debugLib from '../lib/debug';

import mediator from '../mediator';
import actionTypes from '../constants/action-types';

const debug = debugLib('components:messages');

export default class Messages extends React.Component {
  state = { message: null };

  componentDidMount() {
    mediator.on(actionTypes.MESSAGE, ::this._setMessage);
  }
  componentWillUnmount() {
    mediator.removeListener(actionTypes.MESSAGE, ::this._setMessage);
  }
  _setMessage(message) {
    debug('new message %s', message);
    // TODO: hack because transition do another render
    //   mediator render should be last
    _.delay(() => {
      this.setState({
        message: message
      });

      this.refs.message.dismiss();
      this.refs.message.show();
    }, 20);
  }
  render() {
    const message = this.state.message;

    if (!message) return null;

    this.state.message = null;

    debug('render');

    return (
      <Snackbar
        ref="message"
        message={message}
        action="Close"
        onActionTouchTap={::this._onClose} />
    );
  }
  _onClose() {
    this.refs.message.dismiss();
  }
}
