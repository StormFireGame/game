var koa = require('koa'),

    app = koa(),

    env = process.env.NODE_ENV || 'development',
    config = require('./config/environment')[env],

    port;

require('./config/mongoose')(config);

require('./config/koa')(app);

require('./config/routes')(app);

port = process.env.PORT || config.port || 3000;
app.listen(port);

console.log('Game app running on port ' + port);
