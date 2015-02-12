var React = require('react');
var debug = require('debug')('game:pages:heroes:show');

var HeroesBody = require('../../components/heroes/body.jsx');
var HeroesInfo = require('../../components/heroes/info.jsx');

var HeroesShowPage = React.createClass({
  render: function() {
    debug('render');
    return (
      <div id="heroes-show">
        <section className="body-wrapper">
          <HeroesBody />
        </section>
        <section className="info-wrapper">
          <HeroesInfo />
        </section>
      </div>
    );
  }
});

module.exports = HeroesShowPage;
