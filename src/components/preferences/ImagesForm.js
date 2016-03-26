import React, { Component } from 'react';
import { connect } from 'react-redux';

import mediator from '../../mediator';
import { asyncSaveGeneral } from '../../actions/heroActions';

class ImagesForm extends Component {
  constructor(props) {
    super(props);

    const { hero } = props;

    this.state = {
      image: hero.image,
    };
  }

  onSelect(image) {
    this.setState({ image });
  }

  onSave() {
    const { dispatch } = this.props;
    dispatch(asyncSaveGeneral(this.state));
  }

  render() {
    let { image } = this.state;
    const { hero } = this.props;
    let { heroImages } = mediator.storage;

    heroImages = heroImages.filter((item) => item.gender === hero.gender);
    heroImages.unshift({
      id: 0,
    });

    if (!image) image = 0;

    // TODO: path should be static/...
    return (
      <div>
        <div className="uk-grid">
          {heroImages.map((item) => (
            <div
              className="uk-width-1-4 uk-position-relative"
              onClick={this.onSelect.bind(this, item.id)}
            >
              {item.id === image ?
                <div className="uk-position-top-left uk-badge uk-badge-success">
                  Selected
                </div> : null}
              <img
                style={{ height: 210 }}
                className="uk-align-center"
                src={(!item.id) ?
                  require('../../assets/img/hero-body/no-hero.png') :
                  require(`../../../static/uploads/hero-images/${item.image}`)}
              />
            </div>
          ))}
        </div>
        <div className="uk-margin-top">
          <button
            type="button"
            onClick={::this.onSave}
            className="uk-button uk-button-primary"
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

function select(state) {
  return { hero: state.hero };
}

export default connect(select)(ImagesForm);
