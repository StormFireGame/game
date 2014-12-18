var router = require('koa-router'),
    logger = require('koa-logger'),
    compress = require('koa-compress'),
    errorHandler = require('koa-error'),
    responseTime = require('koa-response-time'),
    bodyParser = require('koa-bodyparser'),
    session = require('koa-session'),
    cors = require('koa-cors');

module.exports = function(app) {
  app.use(cors());
  app.use(logger());
  app.use(errorHandler());

  app.use(bodyParser());
  app.use(session());

  app.use(compress());

  app.use(responseTime());

  app.use(router(app));
};
