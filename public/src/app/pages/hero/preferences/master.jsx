var React = require('react');
var Router = require('react-router');

var debug = require('debug')('game:pages:hero:preferences:master');

var Menu = require('../../../components/hero/preferences/menu');
var AuthMixin = require('../../mixins/auth');

var RouteHandler = Router.RouteHandler;
var State = Router.State;

var Master = React.createClass({
  mixins: [AuthMixin, State],
  render: function() {

    debug('master render %s', this.getPath());

    return (
      <div style={{
        display: 'flex',
        flexWrap: 'nowrap'
      }}>
        <div style={{
          flexBasis: 250
        }}>
          <Menu />
        </div>
        <div style={{
          marginLeft: 20,
          flexGrow: 1,
          flexShrink: 0,
          flexBasis: 300
        }}>
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
});

module.exports = Master;
