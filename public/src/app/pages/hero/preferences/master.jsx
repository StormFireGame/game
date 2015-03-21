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
      <div className="row">
        <div className="col-md-3">
          <Menu />
        </div>
        <div className="col-md-9">
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
});

module.exports = Master;
