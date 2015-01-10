var React = require('react'),
    mui = require('material-ui'),

    debug = require('debug')('game:components:heroes:body-image-slot'),

    Paper = mui.Paper;

var HeroesBodyImageSlot = React.createClass({
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

module.exports = HeroesBodyImageSlot;
