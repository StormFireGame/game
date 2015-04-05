var React = require('react');

var IslandApi = require('../utils/island-api');
var Island = require('../components/island');

var debug = require('debug')('game:pages:island');

var AuthMixin = require('./mixins/auth');

var IslandPage = React.createClass({
  mixins: [AuthMixin],
  componentDidMount: function() {
    IslandApi.fetch();
  },
  render: function() {
    debug('render');

    return (
      <div id="island">
        <Island />
      </div>
    );
  }
});

module.exports = IslandPage;
