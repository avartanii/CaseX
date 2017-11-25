/* eslint prefer-destructuring: "off" */

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = (app) => {
  // app.post('/authenticate', (req, res) => {
  //   User.findOne({
  //     email: req.body.email,
  //   }, (err, user) => {
  //     if (err) throw err;
  //     if (!user) {
  //       res.json({ success: false, message: 'Authentication failed. User not found.' });
  //     } else if (user) {
  //       // check if password matches
  //       bcrypt.compare(req.body.password, user.password, (error, match) => {
  //         if (err) return res.error(error);
  //         if (!match) {
  //           return res.status(400).json({ success: false, message: 'Authentication failed. Wrong password.' });
  //         }
  //         const payload = {
  //           email: user.email,
  //         };
  //         const token = jwt.sign(payload, app.get('superSecret'), {
  //           expiresIn: '1d', // expires in 24 hours
  //         });
  //
  //         // return the information including token as JSON
  //         return res.json({
  //           success: true,
  //           message: 'Enjoy your token!',
  //           token,
  //         });
  //       });
  //     }
  //   });
  // });
};
