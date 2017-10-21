/* CaseX server */

var express = require('express');
var http = require('http');
var fs = require('fs');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

console.log('Configuring the CaseX API');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.logger('dev'));
// app.use(express.methodOverride()); // don't know what this does
// app.use(express.cookieParser());
app.use(session({
  store: new MongoStore({
    url: config.db,
  }),
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
}));
app.use(cors());

app.set('env', env);
app.set('corsOrigin', config.corsOrigin);

console.log('CORS host: %s', app.get('corsOrigin'));

if (app.get('env') === 'development') {
  app.use(errorhandler());
}
console.log('Connecting to Mongo at %s', config.db);
mongoose.connect(config.db, { useMongoClient: true });

console.log('Loading models');
fs.readdirSync(__dirname + '/models').forEach(function (file) {
  if (file.match('.js$')) {
    require(__dirname + '/models/' + file);
  }
});

console.log('Loading controllers');
fs.readdirSync(__dirname + '/controllers').forEach(function (file) {
  if (file.match('.js$')) {
    require(__dirname + '/controllers/' + file)(app);
  }
});

// Start the server only if this is run as a command
if (!module.parent) {
  http.createServer(app).listen(app.get('port'), function () {
    console.log('CaseX API running on port %s, environment=%s', app.get('port'), env);
  });
} else {
  module.exports = app;
}
