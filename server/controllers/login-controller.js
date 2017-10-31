var User = require('../models/user');
var bcrypt = require('bcrypt');
var LIMIT = 100;

module.exports = function (app) {

  app.get('/users', function (req, res) {
    User
      .find({})
      .limit(LIMIT)
      .exec(function (err, users) {
        if (err) {
          return res.json(500, err);
        }
        res.send(users);
      });
  });

  // Logs in a user
  app.post('/login', function (req, res) {
    // TODO Admin Auth
    var password = req.body.password;
    var hash = req.body.hash;
    bcrypt.compare(password, hash, function (err, response) {
      if (response) {
        res.status(202).end('accept');
      } else {
        res.status(406).end('deny');
      }
    });
  });
};
