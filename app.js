var koa = require('koa');
var http = require('http');
var socket = require('socket.io');
var passport = require('koa-passport');
var debug = require('debug')('game:application');
var app = koa();

var env = process.env.NODE_ENV || 'development';
var config = require('./config/environment')[env];

var port;
var server;
var io;

require('./config/mongoose')(config);

app.use(passport.initialize());

require('./config/koa')(app);

require('./config/passport')(passport);

require('./config/routes')(app);

port = process.env.PORT || config.port || 3000;

server = http.createServer(app.callback());
io = socket(server);

require('./config/io')(io);

server.listen(port);

debug('game app running on port %s', port);
