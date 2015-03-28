var React = require('react');
var debug = require('debug')('game:pages:hero:show');

var SkillApi = require('../../utils/skill-api');
var AuthMixin = require('../mixins/auth');

var HeroBody = require('../../components/hero/body');
var HeroInfo = require('../../components/hero/info');

var HeroShowPage = React.createClass({
  mixins: [AuthMixin],
  componentDidMount: function() {
    SkillApi.fetch();
  },
  render: function() {
    debug('render');

    return (
      <div className="row">
        <div className="col-md-4">
          <HeroBody />
        </div>
        <div className="col-md-8">
          <HeroInfo />
        </div>
      </div>
    );
  }
});

module.exports = HeroShowPage;
