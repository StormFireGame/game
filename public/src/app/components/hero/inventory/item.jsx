var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');

var HeroApi = require('../../../utils/hero-api');
var mediator = require('../../../mediator');
var actionTypes = require('../../../constants/action-types');

var ThingSlot = require('../body/thing-slot');

var debug = require('debug')('game:components:hero:inventory:item');

var Paper = mui.Paper;
var FontIcon = mui.FontIcon;
var RaisedButton = mui.RaisedButton;

var HeroInventoryItem = React.createClass({
  _handleRemove: function() {
    HeroApi.removeThing(this.props.thing._id)
      .then(function() {
        mediator.emit(actionTypes.MESSAGE, 'Thing removed');
      });
  },
  _handleDress: function() {
    HeroApi.dressThing(this.props.thing._id);
  },
  render: function() {
    var thingWrap = this.props.thing;
    var thing = thingWrap.thing;
    var hero = this.props.hero;
    var canBeDressed = true;

    var renderItem = function(key, value, safe) {
      if (_.isUndefined(value)) return;

      return (
        <div key={key}>
          <strong>{key}:</strong>
          &nbsp;
          <span style={{color: (safe === false) ? 'red' : null }}>{value}</span>
        </div>
      );
    };

    var needItems = [
      'levelNeed',
      'strengthNeed', 'dexterityNeed', 'intuitionNeed', 'healthNeed',
      'swordsNeed', 'axesNeed', 'knivesNeed', 'clubsNeed', 'shieldsNeed'
    ].map(function(item) {
      var key = item.replace('Need', '');

      var label = _.capitalize(key);

      if (hero[key] < thing[item]) {
        canBeDressed = false;
      }

      return renderItem(label, thing[item], hero[key] >= thing[item]);
    });

    var give = [
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
    ];

    var giveItems = give.map(function(item) {
      var label = _.capitalize(item.replace('Give', ''));
      return renderItem(label, thing[item]);
    });

    debug('render');

    return (
      <Paper className="item" zDepth={1}>
        <div>
          <div className="mui-font-style-title">
            {thing.name}
          </div>
        </div>
        <div>
          <FontIcon className="mdfi_action_account_balance_wallet" /> {thing.price}
          &nbsp;
          <FontIcon className="mdfi_action_work" /> {thing.weight}
        </div>
        <div className="content-wrapper row">
          <div className="col-md-4">
            <div className="image-wrapper">
              <ThingSlot type={thing.type} thing={thingWrap} />

              <div style={
                {color:
                  (thingWrap.stabilityAll - thingWrap.stabilityLeft < 2)
                    ? 'red' : null }}>
                {thingWrap.stabilityAll} / {thingWrap.stabilityLeft}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            {(needItems) ?
                <div>
                  <div className="mui-font-style-subhead-1">Requirments</div>
                  {needItems}
                </div> : null}
          </div>
          <div className="col-md-3">
            {(giveItems) ?
                <div>
                  <div className="mui-font-style-subhead-1">Description</div>
                  {giveItems}
                </div> : null}
          </div>
          <div className="actions-wrapper col-md-2">
            {canBeDressed ?
              <RaisedButton onClick={this._handleDress} label="Dress" />
              : null}
            <RaisedButton onClick={this._handleRemove} label="Remove" />
          </div>
        </div>
      </Paper>
    );
  }
});

module.exports = HeroInventoryItem;
