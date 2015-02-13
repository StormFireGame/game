var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:menu');

var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;

var RaisedButton = mui.RaisedButton;
var FontIcon = mui.FontIcon;

var HeroesShowPage = React.createClass({
  render: function() {
    var style = {
      width: 570
    };

    debug('render');

    return (
      <nav id="menu" style={style}>
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <RaisedButton label="Hero" primary={true} />
            <RaisedButton label="Inventary" />
            <RaisedButton label="References" />
            <RaisedButton label="Info" />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <FontIcon className="mdfi_content_undo" />
          </ToolbarGroup>
        </Toolbar>
      </nav>
    );
  }
});

module.exports = HeroesShowPage;
