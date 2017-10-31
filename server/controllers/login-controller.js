var bcrypt = require('bcrypt');

module.exports = function (app) {

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
