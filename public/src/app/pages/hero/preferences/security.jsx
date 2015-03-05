var React = require('react');

var debug = require('debug')('game:pages:hero:preferences:security');

var Form = require('../../../components/hero/preferences/security-form');

var HeroPreferencesSecurityPage = React.createClass({
  render: function() {

    debug('render');

    return (
      <div>
        <h3>Security</h3>
        <Form />
      </div>
    );
  }
});

module.exports = HeroPreferencesSecurityPage;
