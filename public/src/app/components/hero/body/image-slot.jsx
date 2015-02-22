var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:hero:body-image-slot');

var Paper = mui.Paper;

var HeroBodyImageSlot = React.createClass({
  render: function() {
    var style;

    style = {
      position: 'absolute',
      width: this.props.width,
      height: this.props.height,
      top: this.props.top,
      left: this.props.left
    };

    debug('render');

    return (
      <div className="image-slot" style={style}>
        <img src="images/hero-body/no-hero.png" alt="" />
      </div>
    );
  }
});

module.exports = HeroBodyImageSlot;
