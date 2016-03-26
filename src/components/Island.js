import React, { Component } from 'react';
import { connect } from 'react-redux';
import arrayContains from 'array-contains';

import { MESSAGE } from '../constants/AppConstants';

import mediator from '../mediator';

import config from '../config/index';

import { moveOnIsland } from '../actions/heroActions';

export default class Island extends Component {
  state = {
    moveTime: 0,
  };

  onMove(x, y) {
    const { dispatch } = this.props;
    const island = this.getIsland();
    if (arrayContains(island.disabledCoordinates, [x, y])) {
      mediator.emit(MESSAGE, 'You can\'t move there');
      return;
    }

    let counter = config.islandMoveTime;

    this.setState({ moveTime: counter });

    this.moveInterval = window.setInterval(() => {
      counter--;

      this.setState({ moveTime: counter });

      if (counter === 0) {
        window.clearInterval(this.moveInterval);
        dispatch(moveOnIsland(x, y));
      }
    }, 1000);
  }
  onCancelMove() {
    window.clearInterval(this.moveInterval);
    this.setState({ moveTime: 0 });
  }

  getIsland() {
    const { islands } = mediator.storage;
    const { hero } = this.props;
    return islands.find(item => item.id === hero.location.island);
  }
  renderInfo() {
    const { hero } = this.props;
    const { location } = hero;
    const { moveTime } = this.state;

    return (
      <div
        className="
          uk-text-center
          uk-width-medium-1-5 uk-container-center
          uk-panel uk-panel-box
          uk-position-top uk-position-z-index
        "
      >
        <p className="uk-text-bold">Position {location.coordinateX}:{location.coordinateY}</p>
        {moveTime ?
          <p>
            Moving: {moveTime}
            {' '}
            <a onClick={::this.onCancelMove}>Cancel</a>
          </p> : null}
      </div>
    );
  }
  render() {
    const { hero } = this.props;
    const island = this.getIsland();
    const { location } = hero;
    const squareWidth = 20;

    // TODO: maybe should be in db
    const islandDimensions = {
      width: 1980,
      height: 1280,
    };

    const mapDimensions = {
      width: 960,
      height: 480,
    };

    const heroPosition = {
      left: location.coordinateX * squareWidth,
      top: location.coordinateY * squareWidth,
    };
    const mapMargin = {
      left: heroPosition.left - mapDimensions.width / 2,
      top: heroPosition.top - mapDimensions.height / 2,
    };

    if (mapMargin.left < 0) {
      mapMargin.left = 0;
    } else if (islandDimensions.width - mapMargin.left < mapDimensions.width) {
      mapMargin.left -= mapDimensions.width - (islandDimensions.width - mapMargin.left);
    }

    if (mapMargin.top < 0) {
      mapMargin.top = 0;
    } else if (islandDimensions.height - mapMargin.top < mapDimensions.height) {
      mapMargin.top -= mapDimensions.height - (islandDimensions.height - mapMargin.top);
    }

    const mapOffset = {
      top: mapMargin.top / squareWidth,
      left: mapMargin.left / squareWidth,
    };

    // TODO: temporary
    function markSquareRed(e) {
      const targetStyle = e.target.style;
      targetStyle.background = (targetStyle.background === 'red') ? '' : 'red';
    }

    const squares = [];

    for (let i = 0; i < mapDimensions.width / squareWidth; i++) {
      for (let j = 0; j < mapDimensions.height / squareWidth; j++) {
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

        let background = '';
        if (handled) {
          background = 'white';
        } else if (arrayContains(island.disabledCoordinates, [x, y])) {
          background = 'red';
        }

        squares.push(
          <div
            key={`${i}-${j}`}
            style={{
              background,
              cursor: (handled) ? 'pointer' : '',
              opacity: '.2',
              position: 'absolute',
              top: j * squareWidth,
              left: i * squareWidth,
              width: squareWidth,
              height: squareWidth,
            }}
            onClick={handled ? this.onMove.bind(this, x, y) : markSquareRed}
            title={`X: ${x} Y: ${y}`}
          />
        );
      }
    }

    // Getting disabled squares
    // window.coords = []; Array.prototype.forEach.call(document.querySelectorAll("*[style]"), function(elm) {if (elm.style.background === 'red') coords.push([ parseInt(elm.title.split(' ')[1]), parseInt(elm.title.split(' ')[3]) ]); }); JSON.stringify(window.coords);

    return (
      <div className="uk-position-relative">
        {this.renderInfo()}
        <div style={{
          position: 'absolute',
          overflow: 'hidden',
          height: mapDimensions.height,
          width: mapDimensions.width,
          marginLeft: -15,
        }}
        >
          <div>
            <img
              style={{
                maxWidth: 'none',
                marginTop: -mapMargin.top,
                marginLeft: -mapMargin.left,
              }}
              src={require(`../../static/uploads/islands/${island.image}`)}
            />
            {squares}
          </div>
          <i
            style={{
              position: 'absolute',
              top: heroPosition.top - mapMargin.top - 12,
              left: heroPosition.left - mapMargin.left,
            }}
            className="uk-icon-child uk-icon-medium"
          />
        </div>
      </div>
    );
  }
}

function select(state) {
  return { hero: state.hero };
}

export default connect(select)(Island);
