import React, { Component } from 'react';

import ThingSlot from './ThingSlot';

export default class extends Component {
  getStyles() {
    return {
      base: {
        position: 'relative',
        height: 408,
        backgroundColor: '#EEE',
      },
      avatar: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        marginTop: 20,
      },
    };
  }
  getThingsPositions() {
    const basedOffset = 9;
    const offset = 5;
    const width = 81;
    const height = 81;
    const pullRigth = basedOffset + (3 * width) + (3 * offset);
    let fullHeight;
    const ringHeight = 38;
    const elixirHeight = 38;

    const position = {
      gloves: {
        left: basedOffset,
        top: basedOffset,
      },
      helmet: {
        left: basedOffset + width + offset,
        top: basedOffset,
      },
      amulet: {
        left: basedOffset + 2 * width + 2 * offset,
        top: basedOffset,
      },
      treetops: {
        left: pullRigth,
        top: basedOffset,
      },
      arms: {
        height: 85,
        left: basedOffset,
        top: basedOffset + height + offset,
      },
      shield: {
        height: 85,
        left: pullRigth,
        top: basedOffset + height + offset,
      },
    };

    position.armor = {
      height: 100,
      left: basedOffset,
      top: position.arms.top + position.arms.height + offset,
    };

    position.pants = {
      height: 110,
      left: basedOffset,
      top: position.armor.top + position.armor.height + offset,
    };

    fullHeight = basedOffset + height + position.arms.height + position.armor.height +
      position.pants.height + 4 * offset;

    position.elixir = {};
    const elixir = position.elixir;
    elixir.height = elixirHeight;
    elixir.width = elixir.height;
    elixir.left = basedOffset + width + offset;
    elixir.top = fullHeight - elixir.height - offset;

    position.elixir1 = {
      left: elixir.left + offset + elixir.width,
      top: elixir.top,
    };
    position.elixir2 = {
      left: elixir.left + offset * 2 + elixir.width * 2,
      top: elixir.top,
    };
    position.elixir3 = {
      left: elixir.left + 3 * offset + 3 * elixir.width,
      top: elixir.top,
    };

    position.ring = {};
    const ring = position.ring;
    ring.height = ringHeight;
    ring.width = ring.height;
    ring.left = pullRigth;
    ring.top = position.shield.top + position.shield.height + offset;

    position.ring1 = {
      left: ring.left + offset + ring.width,
      top: ring.top,
    };
    position.ring2 = {
      left: ring.left,
      top: ring.top + offset + ring.height,
    };
    position.ring3 = {
      left: ring.left + offset + ring.width,
      top: ring.top + offset + ring.height,
    };

    position.belt = {
      height: 50,
      left: pullRigth,
      top: position.ring.top + 2 * position.ring.height + 2 * offset,
    };

    position.boots = {
      left: pullRigth,
      top: position.belt.top + position.belt.height + offset,
    };

    position.base = {
      position: 'relative',
      width: (width * 4) + (offset * 5),
      height: fullHeight,
    };

    position.image = {
      left: width + 2 * offset,
      top: height + 2 * offset,
      width: 146,
      height: 259,
    };

    return position;
  }

  render() {
    const styles = this.getStyles();
    const thingsPositions = this.getThingsPositions();

    const thingsSlots = [
      'gloves', 'helmet', 'amulet', 'treetops',
      'arms', 'armor', 'shield', 'pants', 'belt', 'boots',
      'ring', 'ring1', 'ring2', 'ring3',
      'elixir', 'elixir1', 'elixir2', 'elixir3',
    ].map((type, index) => (
      <ThingSlot
        key={index}
        position={thingsPositions[type]}
        type={type.replace(/\d+/g, '')}
      />
    ));

    return (
      <div
        className="uk-block"
        style={styles.base}
      >
        <div style={styles.avatar}>
          <img src={require('../../assets/img/hero-body/no-hero.png')} />
        </div>
        {thingsSlots}
      </div>
    );
  }
}
