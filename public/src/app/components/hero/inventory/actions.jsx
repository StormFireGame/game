var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');

var debug = require('debug')('game:components:hero:inventory:actions');

var HeroApi = require('../../../utils/hero-api');
var mediator = require('../../../mediator');
var actionTypes = require('../../../constants/action-types');

var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var RaisedButton = mui.RaisedButton;
var FlatButton = mui.FlatButton;
var DropDownMenu = mui.DropDownMenu;
var FontIcon = mui.FontIcon;
var IconButton = mui.IconButton;
var Dialog = mui.Dialog;
var TextField = mui.TextField;

var HeroInventoryActions = React.createClass({
  getInitialState: function() {
    return {
      selectedComplect: null
    };
  },
  _onUndress: function() {
    HeroApi.undressThings();
  },
  _onFilter: function(e, selectedIndex, menuItem) {
    this.props.filterHandler(menuItem.payload);
  },
  _onComplect: function(e, selectedIndex, menuItem) {
    this.setState({
      selectedComplect: menuItem.payload
    });
  },
  _onNewComplectDialog: function() {
    this.refs.newComplectDialog.show();
  },
  _onNewComplectDialogCancel: function() {
    this.refs.newComplectDialog.dismiss();
  },
  _onNewComplectSubmit: function(e) {
    e.preventDefault();

    var ids = this.props.hero.things
      .filter(thing => thing.dressed)
      .map(thing => thing._id);

    HeroApi.newComplect({
      name: this.refs.complectName.getValue(),
      ids: ids
    }).then(function() {
        this.refs.newComplectDialog.dismiss();
        this.refs.complectName.setValue('');
        mediator.emit(actionTypes.MESSAGE, 'Complect created');
      }.bind(this));
  },
  _onApplyComplect: function() {
    HeroApi.applyComplect(this.state.selectedComplect);
  },
  _onDeleteComplect: function() {
    HeroApi.deleteComplect(this.state.selectedComplect)
      .then(function() {
        this.state.selectedComplect = null;
        mediator.emit(actionTypes.MESSAGE, 'Complect deleted');
      }.bind(this));
  },
  render: function() {
    var hero = this.props.hero;
    var anyThingDressed = hero.things.some((thing) => thing.dressed);
    var disabledComplectActions = !this.state.selectedComplect;
    var selectedComplectIndex;

    var filterOptions = [
      { payload: null, text: 'All' },
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
      { payload: 'treetops', text: 'Treetops' },
      { payload: 'gloves', text: 'Gloves' },
      { payload: 'boot', text: 'Boot' },
      { payload: 'ring', text: 'Ring' },
      { payload: 'amulet', text: 'Amulet' },
      { payload: 'potion', text: 'Potion' },
      { payload: 'elixir', text: 'Elixir' }
    ];

    var complectOptions = hero.complects.map((complect) => {
      return {
        payload: complect._id,
        text: complect.name
      };
    });

    // TODO wrong handling empty dropdown (pr)
    complectOptions.unshift({ payload: null, text: 'Empty' });

    selectedComplectIndex = _.findIndex(complectOptions,
        (option) => option.payload === this.state.selectedComplect);

    // TODO: this._onNewComplect or this._handleNewComplect check everywhere
    var newComplectActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._onNewComplectDialogCancel} />,
      <FlatButton
        label="Save"
        form="newComplectForm"
        primary={true} />
    ];

    debug('render');

    // TODO: onTouchTap or onClick
    return (
      <div className="actions-wrapper">
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <RaisedButton onClick={this._onUndress} label="Undress" />
            <DropDownMenu onChange={this._onFilter} menuItems={filterOptions} />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <IconButton
              onTouchTap={this._onNewComplectDialog}
              tooltip="New complect"
              disabled={!anyThingDressed}>
              <FontIcon className="mdfi_content_add_box"/>
            </IconButton>
            <DropDownMenu
              selectedIndex={
                (selectedComplectIndex === -1) ? 0 : selectedComplectIndex
              }
              menuItems={complectOptions}
              onChange={this._onComplect} />
            <IconButton
              onTouchTap={this._onApplyComplect}
              tooltip="Apply complect"
              disabled={disabledComplectActions}>
              <FontIcon className="mdfi_action_accessibility" />
            </IconButton>
            <IconButton
              onTouchTap={this._onDeleteComplect}
              tooltip="Delete complect"
              disabled={disabledComplectActions}>
              <FontIcon className="mdfi_action_delete" />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>

        <Dialog
          ref="newComplectDialog"
          title="New Complect"
          actions={newComplectActions}>
          <form id="newComplectForm" onSubmit={this._onNewComplectSubmit}>
            <TextField
              ref="complectName"
              hintText="Complect name" required />
          </form>
        </Dialog>
      </div>
    );
  }
});

module.exports = HeroInventoryActions;
