var router = require('koa-router'),
    logger = require('koa-logger'),
    compress = require('koa-compress'),
    errorHandler = require('koa-error'),
    responseTime = require('koa-response-time');

// TODO: check this lib https://github.com/koajs/body-parser

module.exports = function(app) {
  app.use(logger());
  app.use(errorHandler());

  app.use(compress());

  app.use(responseTime());

  app.use(router(app));
};
