/* eslint no-path-concat: "off", prefer-template: "off", global-require: "off" */

const express = require('express');
const http = require('http');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const session = require('express-session');
const morgan = require('morgan');
const MongoStore = require('connect-mongo')(session);
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

console.log('Configuring the CaseX API');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const app = express();
app.set('superSecret', config.secret);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

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
app.set('etag', true);

app.post('/authenticate', (req, res) => {
  User.findOne({
    email: req.body.email,
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      // check if password matches
      bcrypt.compare(req.body.password, user.password, (error, match) => {
        if (err) return res.error(error);
        if (!match) {
          return res.status(400).json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
        const payload = {
          email: user.email,
        };
        const token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn: '1d', // expires in 24 hours
        });

        // return the information including token as JSON
        return res.json({
          success: true,
          message: 'Enjoy your token!',
          token,
        });
      });
    }
  });
});


// route middleware to verify a token
app.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
});

console.log('CORS host: %s', app.get('corsOrigin'));

if (app.get('env') === 'development') {
  app.use(errorhandler());
}
console.log('Connecting to Mongo at %s', config.db);
mongoose.connect(config.db, { useMongoClient: true });

console.log('Loading models');
fs.readdirSync(__dirname + '/models').forEach((file) => {
  if (file.match('.js$')) {
    require(__dirname + '/models/' + file);
  }
});

console.log('Loading controllers');
fs.readdirSync(__dirname + '/controllers').forEach((file) => {
  if (file.match('.js$')) {
    require(__dirname + '/controllers/' + file)(app);
  }
});

// Start the server only if this is run as a command
if (!module.parent) {
  http.createServer(app).listen(app.get('port'), () => {
    console.log('CaseX API running on port %s, environment=%s', app.get('port'), env);
  });
} else {
  module.exports = app;
}
