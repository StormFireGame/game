var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');

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
      <div id="hero-preferences">
        <section className="menu-wrapper">
          <Menu />
        </section>
        <section className="content-wrapper">
          <RouteHandler {...this.props} />
        </section>
      </div>
    );
  }
});

module.exports = Master;
