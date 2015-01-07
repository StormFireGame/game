var React = require('react'),
    Router = require('react-router'),

    Header = require('./components/header.jsx'),
    Footer = require('./components/footer.jsx'),
    Messages = require('./components/messages.jsx'),

    debug = require('debug')('game:master'),

    RouteHandler = Router.RouteHandler,
    State = Router.State;

var Master = React.createClass({
  mixins: [State],
  render: function() {
    var container;

    debug('master render %s', this.getPath());

    if (this.isActive('/heroes/show')) {
      container = (
        <div>
          <Header />
          <RouteHandler {...this.props} />
        </div>
      );
    } else {
      container = (
        <div>
          <RouteHandler {...this.props} />
        </div>
      );
    }

    return (
      <div>
        <div className='container'>
          {container}
        </div>
        <Footer />
        <Messages />
      </div>
    );
  }
});

module.exports = Master;
