import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import moment from 'moment';
import _ from 'lodash';

import debugLib from '../../../lib/debug';

import HeroApi from '../../../utils/hero-api';
import mediator from '../../../mediator';
import actionTypes from '../../../constants/action-types';
import HeroStore from '../../../stores/hero-store';

const debug = debugLib('components:hero:preferences:general-form');

function getHeroState() {
  return {
    hero: HeroStore.get()
  };
}

export default class HeroPreferencesGeneralForm extends React.Component {
  state = getHeroState();

  componentDidMount() {
    HeroStore.addChangeListener(::this.onChange);
  }
  componentWillUnmount() {
    HeroStore.removeChangeListener(::this.onChange);
  }
  onChange() {
    this.setState(getHeroState());
  }
  render() {
    const hero = this.state.hero;

    if (_.isEmpty(hero)) return null;

    let dateOfBirthday;

    debug('render');

    if (hero.dateOfBirthday) {
      dateOfBirthday = moment(hero.dateOfBirthday).format('YYYY-MM-DD');
    }

    return (
      <form onSubmit={::this.handleSubmit}>
        <TextField
          ref="name"
          name="name"
          defaultValue={hero.name}
          floatingLabelText="Name" />
        <br />
        <TextField
          type="date"
          ref="dateOfBirthday"
          name="dateOfBirthday"
          defaultValue={dateOfBirthday}
          floatingLabelText="Date of birthday" />
        <br />
        <TextField
          ref="country"
          name="country"
          defaultValue={hero.country}
          floatingLabelText="Country" />
        <br />
        <TextField
          ref="city"
          name="city"
          defaultValue={hero.city}
          floatingLabelText="City" />
        <br />
        <TextField
          ref="about"
          name="about"
          defaultValue={hero.about}
          multiLine={true}
          floatingLabelText="About" />
        <br />
        <br />
        <RaisedButton label="Save" />
      </form>
    );
  }
  handleSubmit(e) {
    const refs = this.refs;
    e.preventDefault();

    const data = {
      name: refs.name.getValue(),
      dateOfBirthday: refs.dateOfBirthday.getValue(),
      country: refs.country.getValue(),
      city: refs.city.getValue(),
      about: refs.about.getValue()
    };

    // TODO: data do extend not correctly so may be do just throw service
    HeroApi.updateGeneral(data)
      .then(() => {
        mediator.emit(actionTypes.MESSAGE, 'Hero updated');
      });
  }
}
