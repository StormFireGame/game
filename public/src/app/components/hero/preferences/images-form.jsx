import React from 'react';
import {
  RadioButtonGroup,
  RadioButton,
  RaisedButton,
  Paper
} from 'material-ui';
import assign from 'object-assign';
import _ from 'lodash';

import mediator from '../../../mediator';
import HeroApi from '../../../utils/hero-api';
import actionTypes from '../../../constants/action-types';

import HeroImageStore from '../../../stores/hero-image-store';
import HeroStore from '../../../stores/hero-store';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:preferences:images-form');

function getHeroState() {
  return {
    hero: HeroStore.get()
  };
}

function getHeroImagesState() {
  return {
    heroImages: HeroImageStore.get()
  };
};

export default class HeroPreferencesGeneralForm extends React.Component {
  state = assign({},
    getHeroState(),
    getHeroImagesState()
  );

  componentDidMount() {
    HeroImageStore.addChangeListener(::this._onChangeHeroImages);
    HeroStore.addChangeListener(::this._onChangeHero);
  }
  componentWillUnmount() {
    HeroImageStore.removeChangeListener(::this._onChangeHeroImages);
    HeroStore.removeChangeListener(::this._onChangeHero);
  }
  _onChangeHeroImages() {
    this.setState(getHeroImagesState());
  }
  _onChangeHero() {
    this.setState(getHeroState());
  }

  getStyles() {
    return {
      radio: {
        width: 'auto',
        height: 280,
        display: 'inline-block',
        marginRight: 20
      },
      item: {
        width: 146,
        height: 259,
        textAlign: 'center'
      }
    }
  }
  render() {
    const hero = this.state.hero;
    const heroImages = this.state.heroImages;

    if (_.isEmpty(hero) || !heroImages.length) return null;

    const styles = this.getStyles();
    let items;
    const heroImage = (hero.image) ? hero.image._id : -1;

    debug('render');

    items = heroImages
      .map((heroImage, index) => {
        return (
          <RadioButton
            key={index}
            style={styles.radio}
            value={heroImage._id}>
            <Paper
              style={styles.item}
              zDepth={1}>
              <img src={heroImage.image} alt="" />
            </Paper>
          </RadioButton>
        );
      });

    items.unshift(
      (<RadioButton
        key="-1"
        style={styles.radio}
        value="-1">
        <Paper
          style={styles.item}
          zDepth={1}>
          <img src="images/hero-body/no-hero.png" alt="" />
        </Paper>
      </RadioButton>)
    );

    return (
      <form onSubmit={::this._onSubmit}>
        <RadioButtonGroup
          name="heroImage"
          ref="heroImage"
          defaultSelected={heroImage}>
          {items}
        </RadioButtonGroup>
        <br />
        <RaisedButton label="Save" />
      </form>
    );
  }
  _onSubmit(e) {
    e.preventDefault();

    const data = {
      image: this.refs.heroImage.getSelectedValue()
    };

    // TODO: data do extend not correctly so may be do just throw service
    HeroApi.updateGeneral(data)
      .then(() => {
        mediator.emit(actionTypes.MESSAGE, 'Hero image updated');
      });
  }
}
