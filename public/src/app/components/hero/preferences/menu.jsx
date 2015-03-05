var React = require('react');
var mui = require('material-ui');
var Router = require('react-router');
var _ = require('lodash');

var debug = require('debug')('game:components:preferences:menu');

var Menu = mui.Menu;
var State = Router.State;

var PreferencesMenu = React.createClass({
  mixins: [State],
  _onItemClickHandler: function(event, index, item) {
    // TODO: this is hack untill menuitem will support href
    document.location = item.href;
  },
  render: function() {
    var menuItems = [{
      payload: '1',
      text: 'General',
      href: '#/hero/preferences/general',
      selected: this.isActive('/hero/preferences/general')
    }, {
      payload: '2',
      text: 'Security',
      href: '#/hero/preferences/security',
      selected: this.isActive('/hero/preferences/security')
    }, {
      payload: '3',
      text: 'Images',
      href: '#/hero/preferences/images',
      selected: this.isActive('/hero/preferences/images')
    }];
    var selectedIndex = _.findIndex(menuItems, 'selected');

    debug('render');

    return (
      <Menu
        selectedIndex={selectedIndex}
        onItemClick={this._onItemClickHandler}
        menuItems={menuItems} />
    );
  }
});

module.exports = PreferencesMenu;
