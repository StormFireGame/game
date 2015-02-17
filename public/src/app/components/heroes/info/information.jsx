var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:heroes:info:information');

var Paper = mui.Paper;

var HeroesInfoInformation = React.createClass({
  render: function() {
    var props = this.props;
    var style = {
      width: 170,
      height: 140,
      backgroundColor: 'white'
    };

    debug('render');

    return (
      <div>
        <Paper style={style} rounded={false} zDepth={1} className="block information-block">
          <div className="mui-font-style-subhead-1">Information</div>
          <dl className="dl-horizontal">
            <dt>Number of wins</dt>
            <dd>{props.numberOfWins}</dd>
            <dt>Number of losses</dt>
            <dd>{props.numberOfLosses}</dd>
            <dt>Number of draws</dt>
            <dd>{props.numberOfDraws}</dd>
            <dt className="experience">Experience</dt>
            <dd>{props.experience}/{props.nextLevelExperience}</dd>
          </dl>
        </Paper>
      </div>
    );
  }
});

module.exports = HeroesInfoInformation;
