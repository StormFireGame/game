'use strict';

var React = require('react'),
    RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
  render: function() {
    return (
      <div className='container'>
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = App;
