var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:heroes:body-thing-slot');

var Paper = mui.Paper;

var HeroesBodyThingSlot = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
  },
  render: function() {
    var type = this.props.type,
        style;

    style = {
      backgroundColor: 'white',
      position: 'absolute',
      width: this.props.width,
      height: this.props.height,
      top: this.props.top,
      left: this.props.left
    };

    debug('render type %s', type);

    // TODO: props single or double quotes
    return (
      <div>
        <Paper style={style} rounded={false} innerClassName={`slot-${this.props.type}`} zDepth={1} />
      </div>
    );
  }
});

module.exports = HeroesBodyThingSlot;
