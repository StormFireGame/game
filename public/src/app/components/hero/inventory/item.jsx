import React from 'react';
import { Paper, FontIcon, RaisedButton } from 'material-ui';
import _ from 'lodash';

import HeroApi from '../../../utils/hero-api';
import mediator from '../../../mediator';
import actionTypes from '../../../constants/action-types';

import ThingSlot from '../body/thing-slot';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:inventory:item');

export default class HeroInventoryItem extends React.Component {
  static propTypes = {
    thing: React.PropTypes.object
  };

  getStyles() {
    return {
      base: {
        padding: 10,
        height: 'auto'
      },
      content: {
        display: 'flex',
        flexWrap: 'nowrap'
      },
      image: {
        flexBasis: 150
      },
      requirments: {
        flexBasis: 160
      },
      description: {
        flexBasis: 160
      },
      actions: {
        flexBasis: 110
      }
    };
  }

  render() {
    const thingWrap = this.props.thing;
    const thing = thingWrap.thing;
    const hero = this.props.hero;
    let canBeDressed = true;

    function renderItem(key, value, safe) {
      if (_.isUndefined(value)) return;

      return (
        <div key={key}>
          <strong>{key}:</strong>
          {' '}
          <span style={{color: (safe === false) ? 'red' : null }}>{value}</span>
        </div>
      );
    }

    const styles = this.getStyles();

    const needItems = [
      'levelNeed',
      'strengthNeed', 'dexterityNeed', 'intuitionNeed', 'healthNeed',
      'swordsNeed', 'axesNeed', 'knivesNeed', 'clubsNeed', 'shieldsNeed'
    ].map((item) => {
      const key = item.replace('Need', '');
      const label = _.capitalize(key);

      if (hero[key] < thing[item]) {
        canBeDressed = false;
      }

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
      'timeDuration'
    ].map((item) => {
      const label = _.capitalize(item.replace('Give', ''));
      return renderItem(label, thing[item]);
    });

    debug('render');

    return (
      <Paper
        style={styles.base}
        zDepth={1}>
        <h3>
          {thing.name}
        </h3>
        <div>
          <FontIcon className="mdfiactionaccountbalancewallet" /> {thing.price}
          {' '}
          <FontIcon className="mdfiactionwork" /> {thing.weight}
        </div>
        <div style={styles.content}>
          <div style={styles.image}>
            <div>
              <ThingSlot type={thing.type} thing={thingWrap} />

              <div style={
                {color:
                  (thingWrap.stabilityAll - thingWrap.stabilityLeft < 2) ?
                    'red' : null }}>
                {thingWrap.stabilityAll} / {thingWrap.stabilityLeft}
              </div>
            </div>
          </div>
          <div style={styles.requirments}>
            {(needItems) ?
                <div>
                  <div className="mui-font-style-subhead-1">Requirments</div>
                  {needItems}
                </div> : null}
          </div>
          <div style={styles.description}>
            {(giveItems) ?
                <div>
                  <div className="mui-font-style-subhead-1">Description</div>
                  {giveItems}
                </div> : null}
          </div>
          <div style={styles.actions}>
            {canBeDressed ?
              <span>
                <RaisedButton
                  onClick={::this.handleDress}
                  label="Dress" />
                <br />
                <br />
              </span>
              : null}
            <RaisedButton
              onClick={::this.handleRemove}
              label="Remove" />
          </div>
        </div>
      </Paper>
    );
  }
  handleDress() {
    HeroApi.dressThing(this.props.thing.id);
  }
  handleRemove() {
    HeroApi.removeThing(this.props.thing.id)
      .then(() => {
        mediator.emit(actionTypes.MESSAGE, 'Thing removed');
      });
  }
}
