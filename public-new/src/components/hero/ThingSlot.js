import React, { Component } from 'react';
import capitalize from 'capitalize';

export default class extends Component {
  static propTypes = {
    type: React.PropTypes.string,
    position: React.PropTypes.object,
    heroThing: React.PropTypes.object,
    onClick: React.PropTypes.func,
  };

  getStyles() {
    const props = this.props;
    let width = 81;
    let height = 81;
    const ringHeight = 38;
    const elixirHeight = 38;

    switch (props.type) {
      case 'arms':
        height = 85;
        break;
      case 'armor':
        height = 100;
        break;
      case 'pants':
        height = 110;
        break;
      case 'elixir':
        width = height = elixirHeight;
        break;
      case 'shield':
        height = 85;
        break;
      case 'ring':
        width = height = ringHeight;
        break;
      case 'belt':
        height = 50;
        break;
      case 'boots':
        height = 74;
        break;
      default:
    }

    const styles = {
      base: {
        width,
        height,
        position: 'absolute',
        backgroundColor: '#f5f5f5',
        lineHeight: `${height}px`,
        textAlign: 'center',
      },
      placeholder: {
        position: 'absolute',
        top: 2,
        left: 2,
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        textAlign: 'left',
      },
    };

    return styles;
  }

  render() {
    const { type, position, heroThing, onClick } = this.props;
    const thing = heroThing ? heroThing.thing : null;
    const styles = this.getStyles();
    const info = [];

    if (thing) {
      info.push(`Name: ${thing.name}`);
      info.push(`Money: ${thing.price}`);
      info.push(
        `Stability: ${heroThing.stabilityAll}/${heroThing.stabilityLeft}`);

      [
        'strengthGive', 'dexterityGive', 'intuitionGive', 'healthGive',
        'swordsGive', 'axesGive', 'knivesGive', 'clubsGive', 'shieldsGive',

        'damageMin', 'damageMax',

        'protectionHead', 'protectionBreast', 'protectionBelly',
        'protectionGroin', 'protectionLegs',

        'accuracy', 'dodge', 'devastate', 'durability',
        'blockBreak', 'armorBreak',
        'hp',
        'strikeCount', 'blockCount',
        'capacity',
        'isTwoHands',
        'timeDuration',
      ].forEach((item) => {
        if (typeof thing[item] === 'undefined') return;
        info.push(`${capitalize(item.replace('Give', ''))}: ${thing[item]}`);
      });
    }

    return (
      <div
        onClick={onClick}
        className="uk-panel"
        style={Object.assign(styles.base, {
          left: position.left,
          top: position.top,
        })}
      >
        <div style={styles.placeholder}>
          <img
            style={{ verticalAlign: 'top' }}
            src={require(`../../assets/img/hero-body/${type}.png`)}
          />
        </div>

        {thing ?
          <img
            title={info}
            src={require(`../../../static/uploads/things/${thing.image}`)}
          /> : null}
      </div>
    );
  }
}
