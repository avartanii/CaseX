/* eslint prefer-destructuring: "off" */
const Victim = require('../models/victim');

const USER_LIMIT = 100;

module.exports = (app) => {
  app.get('/victims', (req, res) => {
    Victim
      .find({})
      .limit(USER_LIMIT)
      .exec((err, victims) => {
        if (err) {
          return res.json(500, err);
        }
        return res.send(victims);
      });
  });

  // Creates a Victim
  app.post('/victims', (req, res) => {
    Victim.create(req.body, (err, victim) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(201).send(victim);
    });
  });

  // Searches by victimID.
  app.get('/victims/:id', (req, res) => {
    const id = req.params.id;
    Victim.findOne({ _id: id }, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (!result) {
        return res.status(404).json({ 'Victim does not exist': id });
      }
      return res.json(result);
    });
  });

  app.put('/victims/:id', (req, res) => {
    const id = req.params.id;
    Victim.update({ _id: id }, req.body, (err, numUpdated) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json({ 'Number updated': numUpdated });
    });
  });

  app.delete('/victims/:id', (req, res) => {
    const id = req.params.id;
    Victim.remove({ _id: id }, (err) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json({ 'Deleted Victim': id });
    });
  });
};
