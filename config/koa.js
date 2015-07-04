var path = require('path');
var router = require('koa-router');
var logger = require('koa-logger');
var compress = require('koa-compress');
var errorHandler = require('koa-error');
var responseTime = require('koa-response-time');
var bodyParser = require('koa-bodyparser');

var cors = require('koa-cors');
var serve = require('koa-static');

module.exports = function(app) {
  app.use(cors({
    methods: ['GET', 'POST', 'HEAD', 'OPTIONS', 'PUT', 'DELETE', 'PATCH']
  }));
  app.use(logger());
  app.use(errorHandler());

  app.use(serve(path.join(__dirname, '../static/')));
  app.use(serve(path.join(__dirname, '../public/dist/')));

  app.use(bodyParser());

  app.use(compress());

  app.use(responseTime());

  app.use(router(app));
};
