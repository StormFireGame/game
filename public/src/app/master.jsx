var React = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    debug = require('debug')('game:master'),

    Footer = require('./components/footer.jsx'),
    Messages = require('./components/messages.jsx');

var Master = React.createClass({
  render: function() {
    debug('master render');

    return (
      <div>
        <div className='container'>
          <RouteHandler {...this.props} />
        </div>
        <Footer />
        <Messages />
      </div>
    );
  }
});

module.exports = Master;
