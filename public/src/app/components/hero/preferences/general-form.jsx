var React = require('react');
var mui = require('material-ui');
var moment = require('moment');
var _ = require('lodash');

var debug = require('debug')('game:components:hero:preferences:general-form');

var HeroApi = require('../../../utils/hero-api');
var mediator = require('../../../mediator');
var actionTypes = require('../../../constants/action-types');

var HeroListenerMixin = require('../mixins/hero-listener');

var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

var HeroPreferencesGeneralForm = React.createClass({
  mixins: [HeroListenerMixin],
  render: function() {
    var hero = this.state.hero;

    if (_.isEmpty(hero)) return null;

    var dateOfBirthday;

    debug('render');

    if (hero.dateOfBirthday) {
      dateOfBirthday = moment(hero.dateOfBirthday).format('YYYY-MM-DD');
    }

    return (
      <form onSubmit={this._onSubmit}>
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
  },
  _onSubmit: function(e) {
    var refs = this.refs;
    var data;

    e.preventDefault();

    data = {
      name: refs.name.getValue(),
      dateOfBirthday: refs.dateOfBirthday.getValue(),
      country: refs.country.getValue(),
      city: refs.city.getValue(),
      about: refs.about.getValue()
    };

    // TODO data do extend not correctly so may be do just throw service
    HeroApi.updateGeneral(data)
      .then(function() {
        mediator.emit(actionTypes.MESSAGE, 'Hero updated');
      }.bind(this));
  }
});

module.exports = HeroPreferencesGeneralForm;
