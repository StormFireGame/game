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
        payload: complect.id,
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
        onClick={::this.handleNewComplectDialogCancel} />,
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
              onClick={::this.handleUndress}
              label="Undress" />
            <DropDownMenu
              onChange={::this.handleFilter}
              menuItems={filterOptions} />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <IconButton
              onClick={::this.handleNewComplectDialog}
              tooltip="New complect"
              disabled={!anyThingDressed}>
              <FontIcon className="mdficontentaddbox"/>
            </IconButton>
            <DropDownMenu
              selectedIndex={
                (selectedComplectIndex === -1) ? 0 : selectedComplectIndex
              }
              menuItems={complectOptions}
              onChange={::this.handleComplect} />
            <IconButton
              onClick={::this.handleApplyComplect}
              tooltip="Apply complect"
              disabled={disabledComplectActions}>
              <FontIcon className="mdfiactionaccessibility" />
            </IconButton>
            <IconButton
              onClick={::this.handleDeleteComplect}
              tooltip="Delete complect"
              disabled={disabledComplectActions}>
              <FontIcon className="mdfiactiondelete" />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>

        <Dialog
          ref="newComplectDialog"
          title="New Complect"
          actions={newComplectActions}>
          <form id="newComplectForm" onSubmit={::this.handleNewComplectSubmit}>
            <TextField
              ref="complectName"
              hintText="Complect name"
              required={true} />
          </form>
        </Dialog>
      </div>
    );
  }
  handleUndress() {
    HeroApi.undressThings();
  }
  handleFilter(e, selectedIndex, menuItem) {
    this.props.filterHandler(menuItem.payload);
  }
  handleComplect(e, selectedIndex, menuItem) {
    this.setState({
      selectedComplect: menuItem.payload
    });
  }
  handleNewComplectDialog() {
    this.refs.newComplectDialog.show();
  }
  handleNewComplectDialogCancel() {
    this.refs.newComplectDialog.dismiss();
  }
  handleNewComplectSubmit(e) {
    e.preventDefault();

    const ids = this.props.hero.things
      .filter(thing => thing.dressed)
      .map(thing => thing.id);

    HeroApi.newComplect({
      name: this.refs.complectName.getValue(),
      ids: ids
    }).then(() => {
      this.refs.newComplectDialog.dismiss();
      this.refs.complectName.setValue('');
      mediator.emit(actionTypes.MESSAGE, 'Complect created');
    });
  }
  handleApplyComplect() {
    HeroApi.applyComplect(this.state.selectedComplect);
  }
  handleDeleteComplect() {
    HeroApi.deleteComplect(this.state.selectedComplect)
      .then(() => {
        this.state.selectedComplect = null;
        mediator.emit(actionTypes.MESSAGE, 'Complect deleted');
      });
  }
}
