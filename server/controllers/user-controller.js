/* eslint prefer-destructuring: "off" */
const User = require('../models/user');
const bcrypt = require('bcrypt');
const moment = require('moment');

const SALT_ROUNDS = 10;
const LIMIT = 100;

module.exports = (app) => {
  const expires = moment().add('days', 7).valueOf();
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

  // Creates a User
  app.post('/users', (req, res) => {
    bcrypt.hash(req.body.password, SALT_ROUNDS, (err, hash) => {
      if (err) {
        return res.status(400).json(err);
      }
      req.body.password = hash;
      User.create(req.body, (err, user) => {
        if (err) {
          return res.status(400).json(err);
        }
        return res.status(201).send(user);
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
