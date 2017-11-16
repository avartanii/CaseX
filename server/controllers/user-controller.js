var User = require('../models/user');
var bcrypt = require('bcrypt');
var SALT_ROUNDS = 10;
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

  // Creates a User
  app.post('/user', function (req, res) {
    bcrypt.hash(req.body.password, SALT_ROUNDS, function (err, hash) {
      if (err) {
        return res.status(400).json(err);
      }
      req.body.password = hash;
      User.create(req.body, function (err, user) {
        if (err) {
          return res.status(400).json(err);
        }
        res.status(201).send(user);
      });
    });

    // bcrypt.hash(payload.password, saltRounds, function (err, hash) {
    //   if (err) {
    //     return callback(err);
    //   }
    //   Query.createUser(postgres, {
    //     username: payload.username,
    //     password: hash
    //   }, callback);
    // });
    //



    // User.create(req.body, function (err, user) {
    //   if (err) {
    //     return res.status(401).json(err);
    //   }
    //   res.status(201).send(user);
    // });
  });

  // Searches by userID.
  app.get('/user/:id', function (req, res) {
    var id = req.params.id;
    User.findOne({_id: id}, function (err, result) {
      if (err) {
        return res.status(400).send(err);
      }
      if (!result) {
        return res.status(404).json({'User does not exist': id});
      }
      res.json(result);
    });
  });

  app.put('/user/:id', function (req, res) {
    var id = req.params.id;
    User.update({_id: id}, req.body, function (err, numUpdated) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({'Number updated': numUpdated});
    });
  });

  app.delete('/user/:id', function (req, res) {
    var id = req.params.id;
    User.remove({_id: id}, function (err) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({'Deleted user': id});
    });
  });
};
