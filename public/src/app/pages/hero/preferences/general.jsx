var React = require('react');

var debug = require('debug')('game:pages:hero:preferences:general');

var HeroStore = require('../../../stores/hero-store');
var Form = require('../../../components/hero/preferences/general-form');

var HeroPreferencesGeneralPage = React.createClass({
  getInitialState: function() {
    return {
      hero: HeroStore.get()
    };
  },
  render: function() {
    debug('render');

    return (
      <div>
        <h3>General</h3>
        <Form hero={this.state.hero} />
      </div>
    );
  }
});

module.exports = HeroPreferencesGeneralPage;
