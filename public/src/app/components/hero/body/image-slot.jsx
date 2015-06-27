import React from 'react';

import debugLib from '../../../lib/debug';

const debug = debugLib('components:hero:body-image-slot');

export default class HeroBodyImageSlot extends React.Component {
  static propTypes = {
    image: React.PropTypes.object
  };

  render() {
    const image = (this.props.image) ? this.props.image.image :
      'images/hero-body/no-hero.png';

    const style = {
      position: 'absolute',
      width: this.props.width,
      height: this.props.height,
      top: this.props.top,
      left: this.props.left
    };

    debug('render');

    return (
      <div
        className="image-slot"
        style={style}>
        <img src={image} alt="" />
      </div>
    );
  }
}
