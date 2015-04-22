var React = require('react');

var debug = require('debug')('game:pages:hero:inventory');

var AuthMixin = require('../mixins/auth');

var HeroBody = require('../../components/hero/body');
var HeroInventory  = require('../../components/hero/inventory');

var HeroInventoryPage = React.createClass({
  mixins: [AuthMixin],
  render: function() {
    debug('render');

    return (
      <div id="hero-inventory" style={{
        display: 'flex',
        flexWrap: 'nowrap'
      }}>
        <div style={{
          flexBasis: 310,
          flexShrink: 0,
          flexGrow: 0
        }}>
          <HeroBody actions={true} />
        </div>
        <div style={{
          flexGrow: 1,
          flexShrink: 0,
          marginLeft: 20
        }}>
          <HeroInventory />
        </div>
      </div>
    );
  }
});

module.exports = HeroInventoryPage;
