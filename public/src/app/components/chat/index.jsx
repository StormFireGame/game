import React from 'react';
import { Paper } from 'material-ui';

import dom from '../../lib/dom';

import Messages from './messages';
import Participants from './participants';
import Controls from './controls';

import debugLib from '../../lib/debug';

const debug = debugLib('components:chat');

export default class Chat extends React.Component {
  componentDidMount() {
    this._resizeHandle();
  }
  _resizeHandle() {
    const resizer = this.refs.resizer.getDOMNode();
    const wrapper = this.refs.wrapper.getDOMNode();
    let start;
    let wrapperHeight;

    dom.on(resizer, 'dragstart', (e) => {
      start = e.clientY;
      wrapperHeight = parseInt(wrapper.style.height, 10);
    });

    dom.on(resizer, 'drag', (e) => {
      if (e.clientY === 0) return;
      wrapper.style.height = wrapperHeight + (start - e.clientY);
    });
  }
  render() {
    debug('render');

    const style = {
      height: 200,
      minHeight: 150,
      maxHeight: 350
    };

    return (
      <div
        style={style}
        ref="wrapper">
        <div
          ref="resizer"
          draggable="true"
          style={{
            width: '100%',
            height: 2,
            cursor: 'row-resize',
            position: 'absolute'
          }} />
        <Paper
          innerStyle={{
            padding: 5
          }}
          rounded={false}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap'
            }}>
            <div
              style={{
                flexGrow: 1,
                flexShrink: 0,
                flexBasis: 500,
                height: 'calc(100% - 43px)',
                marginRight: 5
              }}>
              <Messages />
            </div>
            <div
              style={{
                height: '100%',
                flexBasis: 300,
                flexShrink: 0,
                flexGrow: 0
              }}>
              <Participants />
            </div>
          </div>
          <div style={{
            position: 'absolute',
            bottom: 0
          }}>
            <Controls />
          </div>
        </Paper>
      </div>
    );
  }
}
