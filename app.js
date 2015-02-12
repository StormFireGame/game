var koa = require('koa');
var passport = require('koa-passport');
var debug = require('debug')('game:application');
var app = koa();

var env = process.env.NODE_ENV || 'development';
var config = require('./config/environment')[env];

var port;

require('./config/mongoose')(config);

app.use(passport.initialize());

require('./config/koa')(app);

require('./config/passport')(passport);

require('./config/routes')(app);

port = process.env.PORT || config.port || 3000;
app.listen(port);

debug('game app running on port %s', port);
