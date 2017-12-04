/* eslint prefer-destructuring: "off" */

const Suspect = require('../models/suspect');
const moment = require('moment');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const LIMIT = 100;

module.exports = (app) => {
  const expires = moment().add(7, 'days').valueOf();
  app.get('/suspects', (req, res) => {
    Suspect
      .find({})
      .limit(LIMIT)
      .exec((err, suspects) => {
        if (err) {
          return res.json(500, err);
        }
        // res.set('Cache-Control', 'max-age=60');
        // res.set('Expires', expires);
        return res.status(200).send(suspects);
      });
  });

  // Creates a Suspect
  app.post('/suspects', (req, res) => {
    Suspect.create(req.body, (err, suspect) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(201).send(suspect);
    });
  });

  // Searches by suspectID.
  app.get('/suspects/:id', (req, res) => {
    const id = req.params.id;
    Suspect.findOne({ _id: id }, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (!result) {
        return res.status(404).json({ 'Suspect does not exist: ': id });
      }
      return res.status(200).json(result);
    });
  });

  app.put('/suspects/:id', (req, res) => {
    const id = req.params.id;
    Suspect.update({ _id: id }, req.body, (err, numUpdated) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json({ 'Number updated': numUpdated });
    });
  });

  app.delete('/suspects/:id', (req, res) => {
    const id = req.params.id;
    Suspect.remove({ _id: id }, (err) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json({ 'Deleted suspect': id });
    });
  });
};
