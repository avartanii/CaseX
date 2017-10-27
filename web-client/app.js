/* CaseX web client */

var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon'); // TODO: reenable when we make a favicon
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var index = require('./routes/index');
var admin = require('./routes/admin');
var indCase = require('./routes/ind-case');
var explorer = require('./routes/explorer');
var input = require('./routes/input');
var testing = require('./routes/testing');
var login = require('./routes/login');
var about = require('./routes/about');
var users = require('./routes/users');

// var env = process.env.NODE_ENV || 'development';
// var conf = require('./config/webConfig')[env];

var app = express();
// var mongo...

app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/admin', admin);
app.use('/case', indCase);
app.use('/explorer', explorer);
app.use('/input', input);
app.use('/testing', testing);
app.use('/login', login);
app.use('/about', about);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
