var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');

var debug = require('debug')('game:components:hero:body-thing-slot');

var Paper = mui.Paper;

var HeroBodyThingSlot = React.createClass({
  // TODO: add propTypes everywhere
  propTypes: {
    type: React.PropTypes.string,
  },
  render: function() {
    var props = this.props;
    var type = props.type;
    var thingWrap = props.thing;
    var thing = thingWrap ? thingWrap.thing : null;
    var width = 70;
    var height;
    var info = [];

    switch(type) {
      case 'gloves':
      case 'helmet':
      case 'amulet':
      case 'treetops':
        height = 75;
        break;
      case 'arms':
        height = 85;
        break;
      case 'armor':
        height = 90;
        break;
      case 'pants':
        height = 110;
        break;
      case 'elixir':
        height = 32;
        width = 32;
        break;
      case 'shield':
        height = 85;
        break;
      case 'ring':
        height = 32;
        width = 32;
        break;
      case 'belt':
        height = 50;
        break;
      case 'boots':
        height = 74;
        break;
    }

    var style = {
      width: width,
      height: height
    };



    if (thing) {
      info.push('Name: ' + thing.name);
      info.push('Money: ' + thing.price);
      info.push('Stability: ' +
        thingWrap.stabilityAll  + '/' + thingWrap.stabilityLeft);

      [
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
      ].forEach((item) => {
        if (_.isUndefined(thing[item])) return;
        var label = _.capitalize(item.replace('Give', ''));
        info.push(label + ': ' + thing[item]);
      });
    }

    debug('render type %s', type);

    // TODO: props single or double quotes
    return (
      <div>
        <Paper
          title={info.join('\n')}
          style={style}
          rounded={false}
          innerClassName={`slot-${type}`}
          zDepth={1}>
          {thing ?
            <img src={thing.image} /> : null}
        </Paper>
      </div>
    );
  }
});

module.exports = HeroBodyThingSlot;
