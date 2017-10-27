var Suspect = require('../models/suspect');
var LIMIT = 100;

module.exports = function (app) {

  app.get('/suspects', function (req, res) {
    Suspect
      .find({})
      .limit(LIMIT)
      .exec(function (err, suspects) {
        if (err) {
          return res.json(500, err);
        }
        res.send(suspects);
      });
  });

  // Creates a Suspect
  app.post('/suspect', function (req, res) {
    // Check if case with that DR # does not already exist
    Suspect.create(req.body, function (err, suspect) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).send(suspect);
    });
  });

  // Searches by suspectID.
  app.get('/suspect/:id', function (req, res) {
    var id = req.params.id;
    Suspect.findOne({drNum: req.params.id}, function (err, result) {
      if (err) {
        return res.status(400).send(err);
      }
      if (!result) {
        return res.status(404).json({'DR Num does not exist': id});
      }
      res.json(result);
    });
  });

  app.put('/suspect/:id', function (req, res) {
    // TODO Admin Auth
    var id = req.params.id;
    Suspect.update({_id: id}, req.body, function (err, numUpdated) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({'Number updated': numUpdated});
    });
  });

  app.delete('/suspect/:id', function (req, res) {
    // TODO Admin auth
    var id = req.params.id;
    Suspect.remove({_id: id}, function (err) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({Deleted: id});
    });
  });
};
