var React = require('react');

var debug = require('debug')('game:pages:hero:preferences:general');

var Form = require('../../../components/hero/preferences/general-form');

var HeroPreferencesGeneralPage = React.createClass({
  render: function() {
    debug('render');

    return (
      <div>
        <h3>General</h3>
        <Form />
      </div>
    );
  }
});

module.exports = HeroPreferencesGeneralPage;
