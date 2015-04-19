# Game BBMMORPG
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/DragonLegend/game?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://img.shields.io/travis/DragonLegend/game/master.svg?style=flat-square)](https://travis-ci.org/DragonLegend/game)  
Browser based massively multiplayer online role playing game

## Technologies

* [Koa](http://koajs.com/)
* [Mongoose](http://mongoosejs.com/)
* [Socket.io](http://socket.io/)
* [React](http://facebook.github.io/react/) + [Flux](http://facebook.github.io/flux/)
* [Material-UI](http://material-ui.com/)
* [Gulp](http://gulpjs.com/)

## Dependencies
Mongo  
Node v0.12.x

## Usage

### Backend
```
npm install  
npm start
```

### Frontend
```
cd public
npm install

git clone git@github.com:callemall/material-ui.git
cd material-ui
npm install
rm -rf node_modules/react
cd ..

npm start
```

> Accourding to issue [#42](https://github.com/DragonLegend/game/issues/42) Login is not working so if you have some problems ask in chat

## Progress
![Signin](progress-signin.png)
![Hero](progress-hero.png)
![Preferences](progress-preferences.png)
![Inventory](progress-inventory.png)
![Island](progress-island.png)
![Chat](progress-chat.png)

## License

MIT © [ButuzGOL](https://butuzgol.github.io)
