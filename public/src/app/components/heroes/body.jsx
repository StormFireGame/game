var React = require('react'),
    mui = require('material-ui'),

    debug = require('debug')('game:components:heroes:body'),

    ThingSlot = require('./thing-slot.jsx'),
    ImageSlot = require('./image-slot.jsx'),
    BodyHeader = require('./body-header.jsx'),

    Paper = mui.Paper;

var HeroesBody = React.createClass({
  render: function() {
    var style,
        proportions = {},
        width = 70,
        height = 75,
        offset = 6,
        pullRigth = (3 * width) + (4 * offset),
        fullHeight,
        elixir,
        ring;

    proportions.glows = {
      width: width,
      height: height,
      left: offset,
      top: offset
    };

    proportions.helmet = {
      width: width,
      height: height,
      left: width + 2 * offset,
      top: offset
    };

    proportions.amulet = {
      width: width,
      height: height,
      left: 2 * width + 3 * offset,
      top: offset
    };

    proportions.treetop = {
      width: width,
      height: height,
      left: pullRigth,
      top: offset
    };

    proportions.arms = {
      width: width,
      height: 85,
      left: offset,
      top: height + 2 * offset
    };

    proportions.armor = {
      width: width,
      height: 90,
      left: offset,
      top: proportions.arms.top + proportions.arms.height + offset
    };

    proportions.pants = {
      width: width,
      height: 110,
      left: offset,
      top: proportions.armor.top + proportions.armor.height + offset
    };

    fullHeight = height + proportions.arms.height +
      proportions.armor.height + proportions.pants.height + 5 * offset;

    proportions.elixir = {};
    elixir = proportions.elixir;
    elixir.height = 32;
    elixir.width = elixir.height;
    elixir.left = width + (2 * offset);
    elixir.top = fullHeight - elixir.height - offset;

    proportions.elixir1 = {
      width: elixir.width,
      height: elixir.height,
      left: elixir.left + offset + elixir.width,
      top: elixir.top
    };
    proportions.elixir2 = {
      width: elixir.width,
      height: elixir.height,
      left: elixir.left + offset * 2 + elixir.width * 2,
      top: elixir.top
    };
    proportions.elixir3 = {
      width: elixir.width,
      height: elixir.height,
      left: elixir.left + 3 * offset + 3 * elixir.width,
      top: elixir.top
    };

    proportions.shield = {
      width: width,
      height: 85,
      left: pullRigth,
      top: height + (2 * offset)
    };

    proportions.ring = {};
    ring = proportions.ring;
    ring.height = 32;
    ring.width = ring.height;
    ring.left = pullRigth;
    ring.top = proportions.shield.top + proportions.shield.height + offset;

    proportions.ring1 = {
      width: ring.width,
      height: ring.height,
      left: ring.left + offset + ring.width,
      top: ring.top
    };
    proportions.ring2 = {
      width: ring.width,
      height: ring.height,
      left: ring.left,
      top: ring.top + offset + ring.height
    };
    proportions.ring3 = {
      width: ring.width,
      height: ring.height,
      left: ring.left + offset + ring.width,
      top: ring.top + offset + ring.height
    };

    proportions.belt = {
      width: width,
      height: 50,
      left: pullRigth,
      top: proportions.ring.top + 2 * proportions.ring.height + 2 * offset
    };

    proportions.boots = {
      width: width,
      height: 74,
      left: pullRigth,
      top: proportions.belt.top + proportions.belt.height + offset
    };

    style = {
      position: 'relative',
      backgroundColor: 'white',
      width: (width * 4) + (offset * 5),
      height: fullHeight
    };

    debug('render');

    return (
      <div>
        <BodyHeader />
        <Paper zDepth={2} style={style}>
          <ImageSlot left={width + 2 * offset} top={height + 2 * offset} width={146} height={259} />

          <ThingSlot type='glows' {...proportions.glows} />
          <ThingSlot type='helmet' {...proportions.helmet} />
          <ThingSlot type='amulet' {...proportions.amulet} />
          <ThingSlot type='treetop' {...proportions.treetop} />
          <ThingSlot type='arms' {...proportions.arms} />
          <ThingSlot type='armor' {...proportions.armor} />
          <ThingSlot type='pants' {...proportions.pants} />
          <ThingSlot type='elixir' {...proportions.elixir} />
          <ThingSlot type='elixir' {...proportions.elixir1} />
          <ThingSlot type='elixir' {...proportions.elixir2} />
          <ThingSlot type='elixir' {...proportions.elixir3} />
          <ThingSlot type='shield' {...proportions.shield} />
          <ThingSlot type='ring' {...proportions.ring} />
          <ThingSlot type='ring' {...proportions.ring1} />
          <ThingSlot type='ring' {...proportions.ring2} />
          <ThingSlot type='ring' {...proportions.ring3} />
          <ThingSlot type='belt' {...proportions.belt} />
          <ThingSlot type='boots' {...proportions.boots} />
        </Paper>
      </div>
    );
  }
});

module.exports = HeroesBody;
