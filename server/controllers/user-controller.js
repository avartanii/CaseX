var User = require('../models/user');
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
    // Check if case with that DR # does not already exist
    User.create(req.body, function (err, user) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).send(user);
    });
  });

  // Searches by userID.
  app.get('/user/:id', function (req, res) {
    var id = req.params.id;
    User.findOne({drNum: req.params.id}, function (err, result) {
      if (err) {
        return res.status(400).send(err);
      }
      if (!result) {
        return res.status(404).json({'DR Num does not exist': id});
      }
      res.json(result);
    });
  });

  app.put('/user/:id', function (req, res) {
    // TODO Admin Auth
    var id = req.params.id;
    User.update({_id: id}, req.body, function (err, numUpdated) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({'Number updated': numUpdated});
    });
  });

  app.delete('/user/:id', function (req, res) {
    // TODO Admin auth
    var id = req.params.id;
    User.remove({_id: id}, function (err) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({Deleted: id});
    });
  });
};
