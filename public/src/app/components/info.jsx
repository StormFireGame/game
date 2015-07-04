import React from 'react';
import { FontIcon } from 'material-ui';
import _ from 'lodash';

import debugLib from '../lib/debug';

import HeroStore from '../stores/hero-store';

const debug = debugLib('components:info');

function getInfoState() {
  return {
    hero: HeroStore.get(),
    currentHp: 0
  };
}

export default class Info extends React.Component {
  state = getInfoState();

  componentDidMount() {
    HeroStore.addChangeListener(::this.onChange);
  }

  componentWillUnmount() {
    HeroStore.removeChangeListener(::this.onChange);
    window.clearInterval(::this.setHpInterval);
  }

  onChange() {
    this.setState(getInfoState());

    window.clearInterval(this.setHpInterval);
    this.setHpInterval = window.setInterval(::this.setHp, 1000);
    this.setHp();
  }

  setHp() {
    const hp = this.state.hero.feature.hp;
    const time = new Date().getTime();
    const delay = 1000;

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
      currentHp: hp.current
    });
  }

  getStyles() {
    return {
      base: {
        position: 'absolute',
        width: 310
      }
    };
  }

  render() {
    const hero = this.state.hero;

    // TODO: change lodash to modules
    if (_.isEmpty(hero)) return null;

    const styles = this.getStyles();
    const hp = hero.feature.hp;

    debug('render');

    return (
      <div style={styles.base}>
        <div>
          <FontIcon
            className="mdfiactioninfo" />
          {' '}
          {hero.login} [{hero.level}]
        </div>
        <FontIcon
          className="mdfiactionfavorite" />
        {' '}
        {this.state.currentHp}/{hp.max}
        {' '}
        <FontIcon
          className="mdfiactionaccountbalancewallet" />
        {' '}
        {hero.money}
      </div>
    );
  }
}
