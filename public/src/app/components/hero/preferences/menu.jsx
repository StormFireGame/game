var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:preferences:menu');

var Menu = mui.Menu;

var PreferencesMenu = React.createClass({
  render: function() {
    var menuItems = [
      { payload: '1', text: 'General'},
      { payload: '2', text: 'Security'},
      { payload: '3', text: 'Images'}
    ];

    debug('render');

    return (
      <div>
        <Menu menuItems={menuItems} />
      </div>
    );
  }
});

module.exports = PreferencesMenu;
