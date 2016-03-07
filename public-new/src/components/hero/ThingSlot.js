import React, { Component } from 'react';

export default class extends Component {
  static propTypes = {
    type: React.PropTypes.string,
    position: React.PropTypes.object,
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
        width: width,
        height: height,
        position: 'absolute',
        backgroundColor: '#f5f5f5',
      },
      placeholder: {
        position: 'absolute',
        top: 2,
        left: 2,
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
      },
    };

    return styles;
  }

  render() {
    const { type, position } = this.props;
    const styles = this.getStyles();

    return (
      <div
        className="uk-panel"
        style={Object.assign(styles.base, {
          left: position.left,
          top: position.top,
        })}>
        <div style={styles.placeholder}>
          <img src={require(`../../assets/img/hero-body/${type}.png`)} />
        </div>
      </div>
    );
  }
}
