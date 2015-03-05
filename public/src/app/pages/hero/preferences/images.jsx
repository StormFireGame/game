var React = require('react');

var debug = require('debug')('game:pages:hero:preferences:images');

var HeroImageService = require('../../../services/hero-image-service');
var HeroStore = require('../../../stores/hero-store');

var Form = require('../../../components/hero/preferences/images-form');

var HeroPreferencesImagesPage = React.createClass({
  getInitialState: function() {
    return {
      // TODO: think about empty array or null to see is it fetched
      heroImages: [],
      hero: HeroStore.get()
    };
  },
  componentDidMount: function() {
    HeroImageService.fetch()
      .then(function(response) {
        this.setState({ heroImages: response });
      }.bind(this));
  },
  render: function() {
    debug('render');

    return (
      <div id="hero-preferences-images">
        <h3>Images</h3>
        <Form hero={this.state.hero} heroImages={this.state.heroImages} />
      </div>
    );
  }
});

module.exports = HeroPreferencesImagesPage;
