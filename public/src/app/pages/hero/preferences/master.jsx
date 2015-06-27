import React from 'react';
import { RouteHandler } from 'react-router';

import debugLib from '../../../lib/debug';

import Menu from '../../../components/hero/preferences/menu';
import AuthMixin from '../../mixins/auth';

const debug = debugLib('pages:hero:preferences:master');

export default class HeroPreferencesMaster extends React.Component {
  // mixins: [AuthMixin, State],
  static contextTypes = {
    router: React.PropTypes.func
  };
  render() {

    debug('master render %s', this.getCurrentPath());

    return (
      <div style={{
        display: 'flex',
        flexWrap: 'nowrap'
      }}>
        <div style={{
          flexBasis: 250
        }}>
          <Menu />
        </div>
        <div style={{
          marginLeft: 20,
          flexGrow: 1,
          flexShrink: 0,
          flexBasis: 300
        }}>
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
}
