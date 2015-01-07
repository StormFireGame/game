var React = require('react'),
    debug = require('debug')('game:pages:heroes:show'),

    HeroesBody = require('../../components/heroes/body.jsx');

var HeroesShowPage = React.createClass({
  render: function() {
    debug('render');
    return (
      <div>
        <section className="body-wrapper">
          <HeroesBody />
        </section>
      </div>
    );
  }
});

module.exports = HeroesShowPage;
