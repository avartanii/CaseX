/* eslint prefer-destructuring: "off" */
const User = require('../models/user');
const moment = require('moment');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const LIMIT = 100;

module.exports = (app) => {
  const expires = moment().add(7, 'days').valueOf();
  app.get('/users', (req, res) => {
    User
      .find({})
      .select('-password')
      .limit(LIMIT)
      .exec((err, users) => {
        if (err) {
          return res.json(500, err);
        }
        res.set('Cache-Control', 'max-age=60');
        res.set('Expires', expires);
        return res.status(200).send(users);
      });
  });

  // Searches by userID.
  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    User.findOne({ _id: id }, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (!result) {
        return res.status(404).json({ 'User does not exist': id });
      }
      return res.status(200).json(result);
    });
  });

  app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    User.update({ _id: id }, req.body, (err, numUpdated) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json({ 'Number updated': numUpdated });
    });
  });

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    User.remove({ _id: id }, (err) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json({ 'Deleted user': id });
    });
  });
};
