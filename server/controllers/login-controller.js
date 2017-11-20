const bcrypt = require('bcrypt');

module.exports = (app) => {

  // Logs in a user
  app.post('/login', (req, res) => {
    // TODO Admin Auth
    const password = req.body.password;
    const hash = req.body.hash;
    bcrypt.compare(password, hash, (err, response) => {
      if (response) {
        res.status(202).end('accept');
      } else {
        res.status(406).end('deny');
      }
    });
  });
};
