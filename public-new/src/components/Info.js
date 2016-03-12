import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import debugLib from '../lib/debug';

const debug = debugLib('components:info');

class Info extends Component {
  state = {};
  componentDidMount() {
    this.setHpInterval = window.setInterval(::this.setHp, 1000);
    this.setHp();
  }
  setHp() {
    const { hero } = this.props;
    const hp = hero.feature.hp;
    const time = new Date().getTime();
    const delay = 100;

    hp.current = Number(hp.current);
    hp.time = new Date(hp.time).getTime();
    hp.max = Number(hp.max);

    if (hp.current === hp.max || this.state.currentHp === hp.max) {
      debug('hp max %s', hp.max);
      window.clearInterval(this.setHpInterval);
      return;
    }

    hp.current += ((time - hp.time) / 1000) / (delay / hp.max);

    if (hp.current > hp.max) hp.current = hp.max;

    hp.current = parseInt(hp.current, 10);
    if (hp.current === this.state.currentHp) return;

    this.setState({
      currentHp: hp.current,
    });
  }
  render() {
    const { hero } = this.props;
    const hp = hero.feature.hp;
    const { currentHp } = this.state;
    const hpReady = currentHp / hp.max;

    const progressClassNames = classNames(
      'uk-progress uk-progress-danger uk-progress-small uk-progress-striped', {
        'uk-active': hpReady !== 1,
      });
    return (
      <div style={{ marginTop: 10 }}>
        <div className="uk-text-center">
          <a className="uk-icon-hover uk-icon-info-circle" />
          {' '}
          <span className="uk-text-bold">{hero.login} [{hero.level}]</span>
        </div>

        <div className={progressClassNames}>
          <div className="uk-progress-bar uk-text-small uk-text-top" style={{
            lineHeight: '14px',
            width: (hpReady * 100) + '%',
          }}
          >
            {currentHp}/{hp.max}
          </div>
        </div>
      </div>
    );
  }
}

function select(state) {
  return { hero: state.hero };
}

export default connect(select)(Info);
