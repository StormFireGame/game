var React = require('react'),
    mui = require('material-ui'),

    debug = require('debug')('game:components:menu'),

    Toolbar = mui.Toolbar,
    ToolbarGroup = mui.ToolbarGroup,

    RaisedButton = mui.RaisedButton,
    Icon = mui.Icon;

var HeroesShowPage = React.createClass({
  render: function() {
    var style = {
      width: 600
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
            <Icon icon='content-undo' />
          </ToolbarGroup>
        </Toolbar>
      </nav>
    );
  }
});

module.exports = HeroesShowPage;
