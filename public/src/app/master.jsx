'use strict';

var React = require('react'),
    RouteHandler = require('react-router').RouteHandler,

    Footer = require('./components/footer.jsx');

var Master = React.createClass({
  render: function() {
    return (
      <div>
        <div className='container'>
          <RouteHandler {...this.props} />
        </div>
        <Footer />
      </div>
    );
  }
});

module.exports = Master;
