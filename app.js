var koa = require('koa'),
    passport = require('koa-passport'),
    debug = require('debug')('game:application'),
    app = koa(),

    env = process.env.NODE_ENV || 'development',
    config = require('./config/environment')[env],

    port;

require('./config/mongoose')(config);

app.use(passport.initialize());

require('./config/koa')(app);

require('./config/passport')(passport);

require('./config/routes')(app);

port = process.env.PORT || config.port || 3000;
app.listen(port);

debug('game app running on port %s', port);
