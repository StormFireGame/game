var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:heroes:info:abilities');

var Paper = mui.Paper;
var FontIcon = mui.FontIcon;

var HeroesInfoAbilities = React.createClass({
  render: function() {
    var props = this.props;
    var style = {
      width: 170,
      height: 180,
      backgroundColor: 'white'
    };

    debug('render');

    return (
      <div>
        <Paper style={style} rounded={false} zDepth={1} className="block abilities-block">
          <div className="mui-font-style-subhead-1">Abilities</div>
          <dl className="dl-horizontal">
            <dt>Swords</dt>
            <dd>
              {props.swords}
              {props.numberOfAbilities ?
                <FontIcon className="mdfi_content_add" /> : null}
            </dd>
            <dt>Axes</dt>
            <dd>
              {props.axes}
              {props.numberOfAbilities ?
                <FontIcon className="mdfi_content_add" /> : null}
            </dd>
            <dt>Knives</dt>
            <dd>
              {props.knives}
              {props.numberOfAbilities ?
                <FontIcon className="mdfi_content_add" /> : null}
            </dd>
            <dt>Clubs</dt>
            <dd>
              {props.clubs}
              {props.numberOfAbilities ?
                <FontIcon className="mdfi_content_add" /> : null}
            </dd>
            <dt>Shields</dt>
            <dd>
              {props.shields}
              {props.numberOfAbilities ?
                <FontIcon className="mdfi_content_add" /> : null}
            </dd>
          </dl>
          {props.numberOfAbilities ?
            <p>Number of increases {props.numberOfAbilities}</p> : null}
        </Paper>
      </div>
    );
  }
});

module.exports = HeroesInfoAbilities;
