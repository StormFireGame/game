var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');

var debug = require('debug')('game:pages:hero:preferences:master');

var Menu = mui.Menu;
var MenuItem = mui.MenuItem;

var RouteHandler = Router.RouteHandler;
var State = Router.State;

var Master = React.createClass({
  mixins: [State],
  _onItemClickHandler: function(event, index, item) {
    // TODO: this is hack untill menuitem will support href
    document.location = item.href;
  },
  render: function() {
    var menuItems = [
      { payload: '1', text: 'General', href: '#/hero/preferences/general' },
      { payload: '2', text: 'Security', href: '#/hero/preferences/security'},
      { payload: '3', text: 'Images', href: '#/hero/preferences/images'}
    ];

    debug('master render %s', this.getPath());

    var menuStyle = {
      width: 200,
      height: 200
    };

    return (
      <div id="hero-preferences">
        <section className="menu-wrapper">
          <Menu style={menuStyle} onItemClick={this._onItemClickHandler} menuItems={menuItems} />
        </section>
        <section className="item-wrapper">
          <RouteHandler {...this.props} />
        </section>
      </div>
    );
  }
});

module.exports = Master;
