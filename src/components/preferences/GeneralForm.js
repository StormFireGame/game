import React, { Component } from 'react';
import { connect } from 'react-redux';

import { asyncSaveGeneral } from '../../actions/heroActions';

class GeneralForm extends Component {
  constructor(props) {
    super(props);

    const { hero } = props;

    this.state = {
      name: hero.name,
      location: hero.location,
      about: hero.about,
    };
  }

  onSave() {
    const { dispatch } = this.props;
    dispatch(asyncSaveGeneral(this.state));
  }

  render() {
    const { name, location, about } = this.state;

    return (
      <form className="uk-form uk-form-horizontal">
        <div className="uk-form-row">
          <label
            className="uk-form-label"
            htmlFor="name"
          >
            Name
          </label>
          <div className="uk-form-controls">
            <input
              value={name}
              onChange={(e) => { this.setState({ name: e.target.value }); }}
              className="uk-width-1-1"
              type="text"
              id="name"
            />
          </div>
        </div>

        <div className="uk-form-row">
          <label
            className="uk-form-label"
            htmlFor="location"
          >
            Location
          </label>
          <div className="uk-form-controls">
            <input
              value={location}
              onChange={(e) => { this.setState({ location: e.target.value }); }}
              className="uk-width-1-1"
              type="text"
              id="location"
            />
          </div>
        </div>

        <div className="uk-form-row">
          <label
            className="uk-form-label"
            htmlFor="about"
          >
            About
          </label>
          <div className="uk-form-controls">
            <textarea
              value={about}
              onChange={(e) => { this.setState({ about: e.target.value }); }}
              className="uk-width-1-1"
              id="about"
              rows="8"
            />
          </div>
        </div>
        <div className="uk-form-row">
          <button
            type="button"
            onClick={::this.onSave}
            className="uk-button uk-button-primary"
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}

function select(state) {
  return { hero: state.hero };
}

export default connect(select)(GeneralForm);
