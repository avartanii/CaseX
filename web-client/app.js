/* CaseX web client */
/* eslint-disable */
const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon'); // TODO: reenable when we make a favicon
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');

const index = require('./routes/index');
const admin = require('./routes/admin');
const ind_case = require('./routes/ind-case');
const explorer = require('./routes/explorer');
const forms = require('./routes/forms');
const testing = require('./routes/testing');
const users = require('./routes/users');

const env = process.env.NODE_ENV || 'development';
const conf = require('./config/webConfig')[env];

const app = express();
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
app.use('/case', ind_case);
app.use('/explorer', explorer);
app.use('/forms', forms);
app.use('/testing', testing);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
