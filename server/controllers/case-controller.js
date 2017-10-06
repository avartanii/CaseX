var Case = require('../models/case');
const CASE_LIMIT = 100;

module.exports = function (app) {

  app.get('/cases', function(req, res) {
    Case
      .find({})
      .limit(CASE_LIMIT)
      .exec(function(err, users) {
        if (err) return res.json(500, err);
        res.send(users);
      });
  });

  // Creates a Case
  app.post('/case', function (req, res) {
    // Check if case with that DR # does not already exist
    Case.count({drNum: req.body.drNum}, function (err, result) {
      if (err) return res.status(400).json(err);
      if (result > 0) {
        return res.status(404).json({'DR Number already exists': req.body.drNum});
      } else {
        // If DR # is unique, then create the case
        Case.create(req.body, function (err, coupon) {
          if (err) return res.status(400).json(err);
          res.status(201).send(coupon);
        });
      }
    });
  });

  // Searches by drNum.
  app.get('/case/:id', function (req, res) {
    var id = req.params.id;
    Case.findOne({drNum: req.params.id}, function (err, result) {
      if (err) return res.status(400).send(err);
      if (!result) return res.status(404).json({'DR Num does not exist': id});
      res.json(result);
    });
  });

  app.put('/case/:id', function (req, res) {
    // TODO Admin Auth
    var id = req.params.id;
    Case.update({_id: id}, req.body, function (err, numUpdated) {
      if (err) return res.status(400).json(err);
      res.status(200).json({'Number updated': numUpdated});
    });
  });

  app.delete('/case/:id', function (req, res) {
    // TODO Admin auth
    var id = req.params.id;
    Case.remove({_id: id}, function (err) {
      if (err) return res.status(400).json(err);
      res.status(200).json({Deleted: id});
    });
  });
}
