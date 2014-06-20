var router = require('koa-router'),
    logger = require('koa-logger'),
    compress = require('koa-compress');

module.exports = function(app) {
  app.use(router(app));
  app.use(logger());
  app.use(compress());
};
