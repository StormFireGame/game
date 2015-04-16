var React = require('react');
var Router = require('react-router');

var Header = require('../components/header');
var Footer = require('../components/footer');
var Messages = require('../components/messages');
var Chat = require('../components/chat/index');

var debug = require('debug')('game:pages:master');

var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Navigation = Router.Navigation;

var Master = React.createClass({
  mixins: [State, Navigation],
  render: function() {
    var container;
    var inside = !this.isActive('/heroes/new') && !this.isActive('/');

    debug('master render %s', this.getPath());

    if (inside) {
      container = (
        <div>
          <Header />
          <div className="main-wrapper">
            <RouteHandler {...this.props} />
          </div>
        </div>
      );
    } else {
      container = (
        <RouteHandler {...this.props} />
      );
    }

    return (
      <div>
        <div className='container'>
          {container}
          <div className="push" />
        </div>
        {(inside) ?
          <div className="chat-wrapper">
            <Chat />
          </div> : null}
        <Footer />
        <Messages />
      </div>
    );
  }
});

module.exports = Master;
