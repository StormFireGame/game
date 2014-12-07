'use strict';

var React = require('react'),

    SigninForm = require('../../components/signin-form');

var SessionsNewPage = React.createClass({
  render: function() {
    return (
      <div className="middle">
        <div className="logo" />
        <SigninForm />
      </div>
    );
  }
});

module.exports = SessionsNewPage;
