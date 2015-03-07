var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:hero:inventory:actions');

var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var RaisedButton = mui.RaisedButton;
var DropDownMenu = mui.DropDownMenu;
var FontIcon = mui.FontIcon;
var FloatingActionButton = mui.FloatingActionButton;

var HeroInventoryActions = React.createClass({
  render: function() {
    debug('render');

    var filterOptions = [
      { payload: 'all', text: 'All' },
      { payload: 'sword', text: 'Sword' },
      { payload: 'axe', text: 'Axe' },
      { payload: 'knive', text: 'Knive' },
      { payload: 'clubs', text: 'Clubs' },
      { payload: 'shield', text: 'Shield' },
      { payload: 'helmet', text: 'Helmet' },
      { payload: 'kolchuga', text: 'Kolchuga' },
      { payload: 'armor', text: 'Armor' },
      { payload: 'belt', text: 'Belt' },
      { payload: 'pants', text: 'Pants' },
      { payload: 'treetop', text: 'Treetop' },
      { payload: 'glove', text: 'Glove' },
      { payload: 'boot', text: 'Boot' },
      { payload: 'ring', text: 'Ring' },
      { payload: 'amulet', text: 'Amulet' },
      { payload: 'potion', text: 'Potion' },
      { payload: 'elixir', text: 'Elixir' }
    ];

    var complectOptions = [{ payload: '-1', text: 'Empty' }];

    return (
      <div className="actions-wrapper">
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <RaisedButton label="Undress" />
            <DropDownMenu menuItems={filterOptions} />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <FontIcon className="mdfi_content_add_box" />
            <DropDownMenu menuItems={complectOptions} />
            <FontIcon className="mdfi_action_accessibility" />
            <FontIcon className="mdfi_action_delete" />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
});

module.exports = HeroInventoryActions;
