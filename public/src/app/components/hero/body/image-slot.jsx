import React from 'react';

import assign from 'object-assign';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:body-image-slot');

export default class HeroBodyImageSlot extends React.Component {
  static propTypes = {
    image: React.PropTypes.object,
    position: React.PropTypes.object
  };

  getStyles() {
    const position = this.props.position;

    return {
      base: assign({
        position: 'absolute',
        width: 146,
        height: 259
      }, {
        left: position.left,
        top: position.top
      })
    };
  }

  render() {
    const image = (this.props.image) ? this.props.image.image :
      'images/hero-body/no-hero.png';

    debug('render');

    return (
      <div
        style={this.getStyles().base}>
        <img src={image} alt="" />
      </div>
    );
  }
}
