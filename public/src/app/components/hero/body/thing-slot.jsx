var React = require('react');
var mui = require('material-ui');

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
    var thing = props.thing;
    var width = 70;
    var height;

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

    debug('render type %s', type);

    // TODO: props single or double quotes
    return (
      <div>
        <Paper
          onClick={props.undressHandler}
          style={style}
          rounded={false}
          innerClassName={`slot-${type}`}
          zDepth={1}>
          {thing ?
            <img src={thing.thing.image} /> : null}
        </Paper>
      </div>
    );
  }
});

module.exports = HeroBodyThingSlot;
