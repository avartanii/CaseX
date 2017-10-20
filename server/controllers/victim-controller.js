var Victim = require('../models/victim');
var USER_LIMIT = 100;

module.exports = function (app) {

  app.get('/victims', function (req, res) {
    Victim
      .find({})
      .limit(USER_LIMIT)
      .exec(function (err, victims) {
        if (err) {
          return res.json(500, err);
        }
        res.send(victims);
      });
  });

  // Creates a Victim
  app.post('/victim', function (req, res) {
    // Check if case with that DR # does not already exist
    Victim.create(req.body, function (err, victim) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).send(victim);
    });
  });

  // Searches by victimID.
  app.get('/victim/:id', function (req, res) {
    var id = req.params.id;
    Victim.findOne({drNum: req.params.id}, function (err, result) {
      if (err) {
        return res.status(400).send(err);
      }
      if (!result) {
        return res.status(404).json({'DR Num does not exist': id});
      }
      res.json(result);
    });
  });

  app.put('/victim/:id', function (req, res) {
    // TODO Admin Auth
    var id = req.params.id;
    Victim.update({_id: id}, req.body, function (err, numUpdated) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({'Number updated': numUpdated});
    });
  });

  app.delete('/victim/:id', function (req, res) {
    // TODO Admin auth
    var id = req.params.id;
    Victim.remove({_id: id}, function (err) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({Deleted: id});
    });
  });
};
