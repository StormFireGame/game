var React = require('react');
var _ = require('lodash');

var debug = require('debug')('game:pages:hero:inventory');

var AuthMixin = require('../mixins/auth');

var HeroBody = require('../../components/hero/body');
var HeroInventory  = require('../../components/hero/inventory');

var HeroInventoryPage = React.createClass({
  mixins: [AuthMixin],
  render: function() {
    debug('render');

    return (
      <div id="hero-inventory" className="row">
        <div className="col-md-4">
          <HeroBody actions={true} />
        </div>
        <div className="col-md-8">
          <HeroInventory />
        </div>
      </div>
    );
  }
});

module.exports = HeroInventoryPage;
