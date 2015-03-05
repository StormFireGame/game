var React = require('react');
var mui = require('material-ui');

var mediator = require('../../../mediator');
var HeroApi = require('../../../utils/hero-api');
var actionTypes = require('../../../constants/action-types');

var debug = require('debug')('game:components:hero:preferences:images-form');

var RadioButtonGroup = mui.RadioButtonGroup;
var RadioButton = mui.RadioButton;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;

var HeroPreferencesGeneralForm = React.createClass({
  _onSubmit: function(e) {
    e.preventDefault();

    data = {
      image: this.refs.heroImage.getSelectedValue()
    };

    // TODO: data do extend not correctly so may be do just throw service
    HeroApi.updateGeneral(data)
      .then(function() {
        mediator.emit(actionTypes.MESSAGE, 'Hero image updated');
      }.bind(this));
  },
  render: function() {
    var items;
    var hero = this.props.hero;
    var heroImage = (hero.image) ? hero.image._id : -1;
    var itemStyle = {
      width: 146,
      height: 259,
      backgroundColor: 'white',
      textAlign: 'center'
    };

    debug('render');

    items = this.props.heroImages
      .map(function(heroImage) {
        return (
          <RadioButton className="item" value={heroImage._id}>
            <Paper style={itemStyle} zDepth={1}>
              <img src={heroImage.image} alt="" />
            </Paper>
          </RadioButton>
        );
      });

    items.unshift(
      (<RadioButton value="-1">
        <Paper className="item" style={itemStyle} zDepth={1}>
          <img src="images/hero-body/no-hero.png" alt="" />
        </Paper>
      </RadioButton>)
    );

    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <RadioButtonGroup
            ref="heroImage"
            defaultSelected={heroImage}>
            {items}
          </RadioButtonGroup>
          <br />
          <RaisedButton label="Save" />
        </form>
      </div>
    );
  }
});

module.exports = HeroPreferencesGeneralForm;
