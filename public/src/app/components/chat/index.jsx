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
    this.resizeHandle();
  }

  getStyles() {
    return {
      base: {
        height: 200,
        minHeight: 150,
        maxHeight: 350
      },
      resizer: {
        width: '100%',
        height: 2,
        cursor: 'row-resize',
        position: 'absolute'
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'nowrap'
      },
      messages: {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 500,
        height: 'calc(100% - 43px)',
        marginRight: 5
      },
      participants: {
        height: '100%',
        flexBasis: 300,
        flexShrink: 0,
        flexGrow: 0
      },
      controls: {
        position: 'absolute',
        bottom: 0
      }
    };
  }
  render() {
    const styles = this.getStyles();

    debug('render');

    return (
      <div
        style={styles.base}
        ref="wrapper">
        <div
          ref="resizer"
          draggable="true"
          style={styles.resizer} />
        <Paper
          innerStyle={{
            padding: 5
          }}
          rounded={false}>
          <div style={styles.wrapper}>
            <div style={styles.messages}>
              <Messages />
            </div>
            <div style={styles.participants}>
              <Participants />
            </div>
          </div>
          <div style={styles.controls}>
            <Controls />
          </div>
        </Paper>
      </div>
    );
  }

  resizeHandle() {
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

}
