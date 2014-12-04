var koa = require('koa'),
    passport = require('koa-passport'),

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

console.log('Game app running on port ' + port);
