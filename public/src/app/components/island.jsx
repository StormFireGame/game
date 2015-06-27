import React from 'react';
import { Paper, FontIcon } from 'material-ui';
import isEmpty from 'is-object-empty';
import assign from 'object-assign';
import arrayContains from 'array-contains';

import IslandStore from '../stores/island-store';
import HeroStore from '../stores/hero-store';
import HeroApi from '../utils/hero-api';
import mediator from '../mediator';
import actionTypes from '../constants/action-types';
import applicationConfig from '../config/application';

import debugLib from '../lib/debug';

const debug = debugLib('components:island');

function getIslandState() {
  return {
    island: IslandStore.get()
  };
}

function getHeroState() {
  return {
    hero: HeroStore.get()
  };
}

export default class Island extends React.Component {
  state = assign({ moveTime: 0 },
    getIslandState(),
    getHeroState()
  );

  componentDidMount() {
    IslandStore.addChangeListener(this._onChangeIsland);
    HeroStore.addChangeListener(this._onChangeHero);
  }
  componentWillUnmount() {
    IslandStore.removeChangeListener(this._onChangeIsland);
    HeroStore.removeChangeListener(this._onChangeHero);

    window.clearInterval(this._moveInterval);
  }
  _onChangeIsland() {
    this.setState(getIslandState());
  }
  _onChangeHero() {
    this.setState(getHeroState());
  }
  render() {
    const state = this.state;
    if (isEmpty(state.island) || isEmpty(state.hero)) return null;

    const island = state.island;
    const hero = state.hero;
    const location = hero.location;

    // TODO Think about where to get image dimensions on client or backend
    const islandDimensions = {
      width: 1980,
      height: 1280
    };
    const mapDimensions = {
      width: 960,
      height: 480
    };

    const heroPosition = {
      left: location.coordinateX * 20,
      top: location.coordinateY * 20
    };
    const mapMargin = {
      left: heroPosition.left - mapDimensions.width / 2,
      top: heroPosition.top - mapDimensions.height / 2
    };

    if (mapMargin.left < 0) {
      mapMargin.left = 0;
    } else if (islandDimensions.width - mapMargin.left < mapDimensions.width) {
      mapMargin.left -=
        mapDimensions.width - (islandDimensions.width - mapMargin.left);
    }

    if (mapMargin.top < 0) {
      mapMargin.top = 0;
    } else if (islandDimensions.height - mapMargin.top < mapDimensions.height) {
      mapMargin.top -=
        mapDimensions.height - (islandDimensions.height - mapMargin.top);
    }

    const style = {
      overflow: 'hidden',
      height: mapDimensions.height,
      width: mapDimensions.width
    };

    const mapStyle = {
      marginTop: -mapMargin.top,
      marginLeft: -mapMargin.left
    };
    const mapOffset = {
      top: mapMargin.top / 20,
      left: mapMargin.left / 20
    };

    const handlerStyle = {
      position: 'absolute',
      top: heroPosition.top - mapMargin.top - 10,
      left: heroPosition.left - mapMargin.left - 2
    };

    const infoStyle = {
      position: 'absolute',
      width: 150,
      height: 80,
      top: 10,
      left: '50%',
      transform: 'translate(-50%, 0%)',
      zIndex: 9,
      textAlign: 'center'
    };

    let squares = [];
    for(let i = 0; i < mapDimensions.width / 20; i++) {
      for(let j = 0; j < mapDimensions.height / 20; j++) {
        const x = (i + mapOffset.left);
        const y = (j + mapOffset.top);
        const coordX = location.coordinateX;
        const coordY = location.coordinateY;

        const handled = (
          coordX - x === -1 && coordY - y === -1 ||
          coordX - x === 0 && coordY - y === -1 ||
          coordX - x === 1 && coordY - y === -1 ||

          coordX - x === -1 && coordY - y === 1 ||
          coordX - x === 0 && coordY - y === 1 ||
          coordX - x === 1 && coordY - y === 1 ||

          coordX - x === -1 && coordY - y === 0 ||
          coordX - x === 1 && coordY - y === 0);

        squares.push(
          <div
            key={i + '-' + j}
            style={{
              background: (handled) ? 'white' :
                ((arrayContains(island.disabledCoordinates, [x, y])) ? 'red' : ''),
              cursor: (handled) ? 'pointer' : '',
              opacity: '.2',
              position: 'absolute',
              top: j * 20,
              left: i * 20,
              width: 20,
              height: 20
            }}
            onClick={(handled) ? this._onMove.bind(null, x, y) : (e) => {
              const style = e.target.style;
              style.background = (style.background === 'red') ? '' : 'red';
            }}
            title={'x: ' + x + ' y: ' + y} />
        );
      }
    }

    // Getting disabled squares
    // window.coords = []; Array.prototype.forEach.call(document.querySelectorAll("*[style]"), function(elm) {if (elm.style.background === 'red') coords.push([ parseInt(elm.title.split(' ')[1]), parseInt(elm.title.split(' ')[3]) ]); }); JSON.stringify(window.coords);

    debug('render');

    return (
      <div>
        <Paper
          style={infoStyle}
          zDepth={2}>
          <p>
            Position: {location.coordinateX}:{location.coordinateY}
          </p>
          {this.state.moveTime ?
            <p>
              Moving: {this.state.moveTime}
              {' '}
              <a href="" onClick={this._onCancelMove}>Cancel</a>
            </p> : null}
        </Paper>
        <Paper
          rounded={false}
          zDepth={2}
          style={style}>
          <div>
            <img
              style={mapStyle}
              src={island.image}
              alt="" />
            {squares}
          </div>
          <FontIcon
            style={handlerStyle}
            className="mdfi_communication_location_on" />
        </Paper>
      </div>
    );
  }
  _onMove(x, y) {
    if (arrayContains(this.state.island.disabledCoordinates, [x, y])) {
      mediator.emit(actionTypes.MESSAGE, 'You can\'t move there');
      return;
    }

    let counter = applicationConfig.islandMoveTime;

    this.setState({
      moveTime: counter
    });

    this._moveInterval = window.setInterval(() => {
      counter--;

      this.setState({
        moveTime: counter
      });

      if (counter === 0) {
        window.clearInterval(this._moveInterval);
        HeroApi.moveOnIsland(x, y);
      }
    } , 1000);
  }
  _onCancelMove(e) {
    e.preventDefault();

    window.clearInterval(this._moveInterval);
    this.setState({
      moveTime: 0
    });
  }
}
