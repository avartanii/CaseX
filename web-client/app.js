/* CaseX web client */

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon'); // TODO: reenable when we make a favicon
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');

// const index = require('./routes/index');
const admin = require('./routes/admin');
const indCase = require('./routes/ind-case');
const explorer = require('./routes/explorer');
const input = require('./routes/input');
const testing = require('./routes/testing');
const login = require('./routes/login');
const about = require('./routes/about');
const users = require('./routes/users');
const home = require('./routes/home');

// const env = process.env.NODE_ENV || 'development';
// const conf = require('./config/webConfig')[env];

const app = express();
// const mongo...

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

app.use('/', home);
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
  const err = new Error('Not Found');
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
