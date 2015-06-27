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
    };

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
      <Paper className="item" zDepth={1}>
        <div className="mui-font-style-title">
          {thing.name}
        </div>
        <div>
          <FontIcon className="mdfi_action_account_balance_wallet" /> {thing.price}
          {' '}
          <FontIcon className="mdfi_action_work" /> {thing.weight}
        </div>
        <div className="content-wrapper" style={{
          display: 'flex',
          flexWrap: 'nowrap'
        }}>
          <div style={{
            flexBasis: 150
          }}>
            <div className="image-wrapper">
              <ThingSlot type={thing.type} thing={thingWrap} />

              <div style={
                {color:
                  (thingWrap.stabilityAll - thingWrap.stabilityLeft < 2) ?
                    'red' : null }}>
                {thingWrap.stabilityAll} / {thingWrap.stabilityLeft}
              </div>
            </div>
          </div>
          <div style={{
            flexBasis: 160
          }}>
            {(needItems) ?
                <div>
                  <div className="mui-font-style-subhead-1">Requirments</div>
                  {needItems}
                </div> : null}
          </div>
          <div style={{
            flexBasis: 160
          }}>
            {(giveItems) ?
                <div>
                  <div className="mui-font-style-subhead-1">Description</div>
                  {giveItems}
                </div> : null}
          </div>
          <div className="actions-wrapper" style={{
            flexBasis: 110
          }}>
            {canBeDressed ?
              <RaisedButton
                onClick={this._onDress}
                label="Dress" />
              : null}
            <RaisedButton
              onClick={this._onRemove}
              label="Remove" />
          </div>
        </div>
      </Paper>
    );
  }
  _onDress() {
    HeroApi.dressThing(this.props.thing._id);
  }
  _onRemove() {
    HeroApi.removeThing(this.props.thing._id)
      .then(() => {
        mediator.emit(actionTypes.MESSAGE, 'Thing removed');
      });
  }
}
