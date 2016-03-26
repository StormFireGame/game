import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Select from '../../shared/Select';
import Button from '../../shared/Button';

import {
  undressThings,
  saveComplect,
  applyComplect,
  removeComplect,
} from '../../../actions/heroActions';

class Actions extends Component {
  propTypes = {
    onFilter: PropTypes.func,
  };

  state = {
    filter: null,
    newComplect: false,
    complect: null,
    newComplectName: '',
  };

  onSaveComplect() {
    const { newComplectName } = this.state;
    const { dispatch, hero } = this.props;
    const things = hero.things.filter(item => item.dressed).map(item => item.id);
    dispatch(saveComplect(newComplectName, things));
    this.setState({ newComplectName: '', newComplect: false });
  }

  render() {
    let { complect } = this.state;
    const { newComplect, newComplectName } = this.state;
    const { dispatch, hero, onFilter } = this.props;

    const filters = [
      { key: '', label: 'All' },
      { key: 'sword', label: 'Sword' },
      { key: 'axe', label: 'Axe' },
      { key: 'knive', label: 'Knive' },
      { key: 'clubs', label: 'Clubs' },
      { key: 'shield', label: 'Shield' },
      { key: 'helmet', label: 'Helmet' },
      { key: 'kolchuga', label: 'Kolchuga' },
      { key: 'armor', label: 'Armor' },
      { key: 'belt', label: 'Belt' },
      { key: 'pants', label: 'Pants' },
      { key: 'treetops', label: 'Treetops' },
      { key: 'gloves', label: 'Gloves' },
      { key: 'boot', label: 'Boot' },
      { key: 'ring', label: 'Ring' },
      { key: 'amulet', label: 'Amulet' },
      { key: 'potion', label: 'Potion' },
      { key: 'elixir', label: 'Elixir' },
    ];

    const complects = hero.complects.map(item => {
      return { key: item.id, label: item.name };
    });
    const dressed = hero.things.some(item => item.dressed);

    if (!hero.complects.find(item => complect === item.id)) {
      complect = null;
    }

    return (
      <nav className="uk-navbar">
        <ul className="uk-navbar-nav">
          <li className="uk-navbar-content">
            <Button
              label="Undress"
              onClick={() => dispatch(undressThings())}
              disabled={!dressed}
            />
          </li>
          <li className="uk-navbar-content">
            <Select
              onChange={onFilter}
              items={filters}
            />
          </li>
        </ul>
        <div className="uk-navbar-flip">
          <ul className="uk-navbar-nav">
            <li className="uk-navbar-content">
              <form className="uk-form uk-margin-remove uk-display-inline-block">
                {!newComplect ? (
                  <div>
                    <Button
                      onClick={() => this.setState({ newComplect: true })}
                      icon="plus-square"
                      disabled={!dressed}
                    />
                    <Select
                      onChange={value => this.setState({ complect: value })}
                      items={complects}
                    />
                    <Button
                      onClick={() => dispatch(applyComplect(complect))}
                      icon="user"
                      disabled={!complect}
                    />
                    <Button
                      onClick={() => dispatch(removeComplect(complect))}
                      icon="minus-square"
                      disabled={!complect}
                    />
                  </div>) : (
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      value={newComplectName}
                      onChange={e => this.setState({ newComplectName: e.target.value })}
                    />
                    <Button
                      onClick={::this.onSaveComplect}
                      icon="plus"
                    />
                    <Button
                      onClick={() => this.setState({ newComplectName: '', newComplect: false })}
                      icon="remove"
                    />
                  </div>
                )}
              </form>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function select(state) {
  return { hero: state.hero };
}

export default connect(select)(Actions);
