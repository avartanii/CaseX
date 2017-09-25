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

  app.post('/case', function (req, res) {
    // TODO Admin auth
    console.log(req.body);
    Case.create(req.body, function (err, coupon) {
      if (err) return res.json(400, err);
      res.status(201).send(coupon);
    });
  });

  app.get('/case/:id', function (req, res) {
    var id = req.params.id;
    Case.findById(id, function (err, coupon) {
      if (err) return res.status(400).send(err);
      if (!coupon) return res.json(404, {'No such coupon': id});
      res.json(coupon);
    });
  });

  app.put('/case/:id', function (req, res) {
    // TODO Admin Auth
    var id = req.params.id;
    Case.update({_id: id}, req.body, function (err, numUpdated) {
      if (err) return res.json(400, err);
      res.status(200).json({'Number updated': numUpdated});
    });
  });

  app.delete('/case/:id', function (req, res) {
    // TODO Admin auth
    var id = req.params.id;
    Case.remove({_id: id}, function (err) {
      if (err) return res.json(400, err);
      res.json(200, {Deleted: id});
    });
  });
}
