var React = require('react');

var debug = require('debug')('game:pages:hero:preferences:images');

var HeroImageApi = require('../../../utils/hero-image-api');

var Form = require('../../../components/hero/preferences/images-form');

var HeroPreferencesImagesPage = React.createClass({
  componentDidMount: function() {
    HeroImageApi.fetch();
  },
  render: function() {
    debug('render');

    return (
      <div id="hero-preferences-images">
        <h3>Images</h3>
        <Form />
      </div>
    );
  }
});

module.exports = HeroPreferencesImagesPage;
