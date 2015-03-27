var React = require('react');
var mui = require('material-ui');
var assign = require('object-assign');
var _ = require('lodash');

var mediator = require('../../../mediator');
var HeroApi = require('../../../utils/hero-api');
var actionTypes = require('../../../constants/action-types');

var HeroImageStore = require('../../../stores/hero-image-store');
var HeroStore = require('../../../stores/hero-store');

var debug = require('debug')('game:components:hero:preferences:images-form');

var RadioButtonGroup = mui.RadioButtonGroup;
var RadioButton = mui.RadioButton;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;

function getHeroState() {
  return {
    hero: HeroStore.get()
  };
}

var getHeroImagesState = function() {
  return {
    heroImages: HeroImageStore.get()
  };
};

var HeroPreferencesGeneralForm = React.createClass({
  getInitialState: function() {
    return assign({},
      getHeroState(),
      getHeroImagesState()
    );
  },
  componentDidMount: function() {
    HeroImageStore.addChangeListener(this._onChangeHeroImages);
    HeroStore.addChangeListener(this._onChangeHero);
  },
  componentWillUnmount: function() {
    HeroImageStore.removeChangeListener(this._onChangeHeroImages);
    HeroStore.removeChangeListener(this._onChangeHero);
  },
  _onChangeHeroImages: function() {
    this.setState(getHeroImagesState());
  },
  _onChangeHero: function() {
    this.setState(getHeroState());
  },
  render: function() {
    var hero = this.state.hero;
    var heroImages = this.state.heroImages;

    if (_.isEmpty(hero) || !heroImages.length) return null;

    var items;
    var heroImage = (hero.image) ? hero.image._id : -1;
    var itemStyle = {
      width: 146,
      height: 259,
      textAlign: 'center'
    };

    debug('render');

    items = heroImages
      .map((heroImage, index) => {
        return (
          <RadioButton
            key={index}
            className="item"
            value={heroImage._id}>
            <Paper
              style={itemStyle}
              zDepth={1}>
              <img src={heroImage.image} alt="" />
            </Paper>
          </RadioButton>
        );
      });

    items.unshift(
      (<RadioButton
        key="-1"
        value="-1">
        <Paper
          className="item"
          style={itemStyle}
          zDepth={1}>
          <img src="images/hero-body/no-hero.png" alt="" />
        </Paper>
      </RadioButton>)
    );

    return (
      <form onSubmit={this._onSubmit}>
        <RadioButtonGroup
          name="heroImage"
          ref="heroImage"
          defaultSelected={heroImage}>
          {items}
        </RadioButtonGroup>
        <br />
        <RaisedButton label="Save" />
      </form>
    );
  },
  _onSubmit: function(e) {
    e.preventDefault();

    var data = {
      image: this.refs.heroImage.getSelectedValue()
    };

    // TODO data do extend not correctly so may be do just throw service
    HeroApi.updateGeneral(data)
      .then(function() {
        mediator.emit(actionTypes.MESSAGE, 'Hero image updated');
      }.bind(this));
  }
});

module.exports = HeroPreferencesGeneralForm;
