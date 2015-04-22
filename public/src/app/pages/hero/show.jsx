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
      <div style={{
        display: 'flex',
        flexWrap: 'nowrap'
      }}>
        <div style={{
          flexBasis: 310,
          flexShrink: 0,
          flexGrow: 0
        }}>
          <HeroBody />
        </div>
        <div style={{
          flexGrow: 1,
          flexShrink: 0,
          marginLeft: 20
        }}>
          <HeroInfo />
        </div>
      </div>
    );
  }
});

module.exports = HeroShowPage;
