var React = require('react');
var mui = require('material-ui');
var Router = require('react-router');

var debug = require('debug')('game:components:menu');

var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;

var RaisedButton = mui.RaisedButton;
var FontIcon = mui.FontIcon;
var State = Router.State;

var HeroShowPage = React.createClass({
  mixins: [State],
  render: function() {
    debug('render');

    return (
      <nav id="menu">
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <RaisedButton
              label="Hero"
              linkButton={true}
              primary={this.isActive('/hero')}
              href="#/hero" />
            <RaisedButton
              linkButton={true}
              label="Inventory"
              primary={this.isActive('/hero/inventory')}
              href="#/hero/inventory" />
            <RaisedButton
              linkButton={true}
              label="Combats"
              primary={this.isActive('/hero/combats')}
              href="#/hero/combats" />
            <RaisedButton
              label="Preferences"
              linkButton={true}
              primary={
                this.isActive('/hero/preferences/general') ||
                this.isActive('/hero/preferences/security') ||
                this.isActive('/hero/preferences/images')
              }
              href="#/hero/preferences/general" />
            <RaisedButton
              linkButton={true}
              label="Info" />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <FontIcon className="mdfi_content_undo" />
          </ToolbarGroup>
        </Toolbar>
      </nav>
    );
  }
});

module.exports = HeroShowPage;
