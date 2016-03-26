import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import capitalize from 'capitalize';
import clone from 'clone';

import mediator from '../../../mediator';

import Button from '../../shared/Button';

import { dressOrUndressThing, asyncRemoveThing } from '../../../actions/heroActions';

import { thingCanBeDressed } from '../../../helpers/heroHelper';

class Items extends Component {
  propTypes = {
    filter: PropTypes.string,
  };

  renderItem(heroThing) {
    const { hero, dispatch } = this.props;
    const thing = heroThing.thing;

    function renderItem(key, value, safe) {
      if (typeof value === 'undefined' || !value) return null;

      return (
        <div key={key}>
          <strong>{key}:</strong>
          {' '}
          <span className={classNames({ 'uk-text-danger': safe === false })}>{value}</span>
        </div>
      );
    }

    const needItems = [
      'levelNeed',
      'strengthNeed', 'dexterityNeed', 'intuitionNeed', 'healthNeed',
      'swordsNeed', 'axesNeed', 'knivesNeed', 'clubsNeed', 'shieldsNeed',
    ].map((item) => {
      const key = item.replace('Need', '');
      const label = capitalize(key);

      return renderItem(label, thing[item], hero[key] >= thing[item]);
    });

    const giveItems = [
      'strengthGive', 'dexterityGive', 'intuitionGive', 'healthGive',
      'swordsGive', 'axesGive', 'knivesGive', 'clubsGive', 'shieldsGive',
      'damageMin', 'damageMax',
      'protectionHead', 'protectionBreast', 'protectionBelly', 'protectionGroin', 'protectionLegs',
      'accuracy', 'dodge', 'devastate', 'durability',
      'blockBreak', 'armorBreak',
      'hp',
      'strikeCount', 'blockCount',
      'capacity',
      'isTwoHands',
      'timeDuration',
    ].map((item) => {
      const label = capitalize(item.replace('Give', ''));
      return renderItem(label, thing[item] > 0 ? `+${thing[item]}` : null);
    });

    return (
      <div className="uk-panel uk-panel-box uk-margin-top">
        <h3 className="uk-margin-bottom-remove">{thing.name}</h3>
        <div>
          <i className="uk-icon-dollar" /> {thing.price}
          {' '}
          <i className="uk-icon-archive" /> {thing.capacity}
        </div>
        <div className="uk-grid uk-margin-small-top">
          <div className="uk-width-2-10 uk-text-center">
            <img
              src={require(`../../../../static/uploads/things/${thing.image}`)}
            />
            <div
              className={
                classNames('uk-text-small', {
                  'uk-text-danger': (heroThing.stabilityAll - heroThing.stabilityLeft) < 2,
                })
              }
            >
              {heroThing.stabilityLeft} / {heroThing.stabilityAll}
            </div>
          </div>
          <div className="uk-width-6-10">
            <div className="uk-grid">
              <div className="uk-width-5-10">
                <h4>Requirments</h4>
                {needItems}
              </div>
              <div className="uk-width-5-10">
                <h4>Description</h4>
                {giveItems}
              </div>
            </div>
          </div>
          <div className="uk-width-2-10">
            {thingCanBeDressed(hero, thing) ?
              <Button
                onClick={() => dispatch(dressOrUndressThing(heroThing.id, true))}
                className="uk-button-primary uk-margin-small-bottom uk-width-1-1"
                label="Dress"
              /> : null}
            <Button
              onClick={() => dispatch(asyncRemoveThing(heroThing.id))}
              className="uk-button-danger uk-width-1-1"
              label="Remove"
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const hero = clone(this.props.hero);
    const { filter } = this.props;
    const { things } = mediator.storage;
    let heroThings = hero.things;

    heroThings.forEach(heroThing => {
      heroThing.thing = things.find((item) => item.id === heroThing.thing);
    });
    heroThings = heroThings.filter((heroThing) => {
      return !heroThing.dressed && (!filter || heroThing.thing.type === filter);
    });

    return (
      <div>
        {heroThings.map(::this.renderItem)}
      </div>
    );
  }
}

function select(state) {
  return { hero: state.hero };
}

export default connect(select)(Items);
