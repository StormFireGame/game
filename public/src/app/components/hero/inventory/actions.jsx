import React from 'react';
import {
  Toolbar,
  ToolbarGroup,
  RaisedButton,
  FlatButton,
  DropDownMenu,
  FontIcon,
  IconButton,
  Dialog,
  TextField
} from 'material-ui';
import _ from 'lodash';

import debugLib from '../../../lib/debug';

import HeroApi from '../../../utils/hero-api';
import mediator from '../../../mediator';
import actionTypes from '../../../constants/action-types';

const debug = debugLib('components:hero:inventory:actions');

export default class HeroInventoryActions extends React.Component {
  static propTypes = {
    hero: React.PropTypes.object,
    filterHandler: React.PropTypes.func
  };

  state = { selectedComplect: null };

  render() {
    const hero = this.props.hero;
    const anyThingDressed = hero.things.some(thing => thing.dressed);
    const disabledComplectActions = !this.state.selectedComplect;
    let selectedComplectIndex;

    const filterOptions = [
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

    let complectOptions = hero.complects.map((complect) => {
      return {
        payload: complect._id,
        text: complect.name
      };
    });

    // TODO: wrong handling empty dropdown (pr)
    complectOptions.unshift({ payload: null, text: 'Empty' });

    selectedComplectIndex = _.findIndex(complectOptions,
        (option) => option.payload === this.state.selectedComplect);

    const newComplectActions = [
      <FlatButton
        key="cancel"
        label="Cancel"
        secondary={true}
        onClick={::this._onNewComplectDialogCancel} />,
      <FlatButton
        key="save"
        label="Save"
        form="newComplectForm"
        primary={true} />
    ];

    debug('render');

    return (
      <div>
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <RaisedButton
              onClick={::this._onUndress}
              label="Undress" />
            <DropDownMenu
              onChange={::this._onFilter}
              menuItems={filterOptions} />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <IconButton
              onClick={::this._onNewComplectDialog}
              tooltip="New complect"
              disabled={!anyThingDressed}>
              <FontIcon className="mdfi_content_add_box"/>
            </IconButton>
            <DropDownMenu
              selectedIndex={
                (selectedComplectIndex === -1) ? 0 : selectedComplectIndex
              }
              menuItems={complectOptions}
              onChange={::this._onComplect} />
            <IconButton
              onClick={::this._onApplyComplect}
              tooltip="Apply complect"
              disabled={disabledComplectActions}>
              <FontIcon className="mdfi_action_accessibility" />
            </IconButton>
            <IconButton
              onClick={::this._onDeleteComplect}
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
          <form id="newComplectForm" onSubmit={::this._onNewComplectSubmit}>
            <TextField
              ref="complectName"
              hintText="Complect name"
              required={true} />
          </form>
        </Dialog>
      </div>
    );
  }
  _onUndress() {
    HeroApi.undressThings();
  }
  _onFilter(e, selectedIndex, menuItem) {
    this.props.filterHandler(menuItem.payload);
  }
  _onComplect(e, selectedIndex, menuItem) {
    this.setState({
      selectedComplect: menuItem.payload
    });
  }
  _onNewComplectDialog() {
    this.refs.newComplectDialog.show();
  }
  _onNewComplectDialogCancel() {
    this.refs.newComplectDialog.dismiss();
  }
  _onNewComplectSubmit(e) {
    e.preventDefault();

    const ids = this.props.hero.things
      .filter(thing => thing.dressed)
      .map(thing => thing._id);

    HeroApi.newComplect({
      name: this.refs.complectName.getValue(),
      ids: ids
    }).then(() => {
        this.refs.newComplectDialog.dismiss();
        this.refs.complectName.setValue('');
        mediator.emit(actionTypes.MESSAGE, 'Complect created');
      });
  }
  _onApplyComplect() {
    HeroApi.applyComplect(this.state.selectedComplect);
  }
  _onDeleteComplect() {
    HeroApi.deleteComplect(this.state.selectedComplect)
      .then(() => {
        this.state.selectedComplect = null;
        mediator.emit(actionTypes.MESSAGE, 'Complect deleted');
      });
  }
}
