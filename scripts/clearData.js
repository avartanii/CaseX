#! /usr/bin/env node
/* eslint-disable */
console.log('This script clears Case, Victim, User, and Suspect data from MongoDB database.');

var async = require('async');
var mongoose = require('mongoose');
const rp = require('request-promise');
const baseUrl = 'http://localhost:3000';
var env = process.env.NODE_ENV || 'development';
var config = require('../server/config/config')[env];

var Case = require('../server/models/case');
var Victim = require('../server/models/victim');
var User = require('../server/models/user');
var Suspect = require('../server/models/suspect');
var fs = require('fs');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
mongoose.Promise = Promise;

console.log('Connecting to Mongo at %s', config.db);
mongoose.connect(config.db, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const clearCases = function (cb) {
  async.parallel([
    function (callback) {
      Case.remove({}, function () {
        callback(null, 'Case Data');
      });
    },
  ],
  cb);
};

var clearVictims = function (cb) {
  async.parallel([
    function (callback) {
      Victim.remove({}, function () {
        callback(null, 'Victim Data');
      });
    },
  ],
  cb);
};

var clearUsers = function (cb) {
  async.parallel([
    function (callback) {
      User.remove({}, function () {
        callback(null, 'User Data');
      });
    },
  ],
  cb);
};

var clearSuspects = function (cb) {
  async.parallel([
    function (callback) {
      Suspect.remove({}, function () {
        callback(null, 'Suspect Data');
      });
    },
  ],
  cb);
};

var createAdministrator = function (cb) {
  async.parallel([
    function (callback) {
      var admin = {
        name: {
          first: 'John',
          middle: 'Admin',
          last: 'Doe'
        },
        employeeID: 123,
        permissionLevel: 'Admin',
        email: 'jdoe@gmail.com',
        password: 'wordpass'
      }
      var originalPassword = admin.password;
      bcrypt.hash(admin.password, SALT_ROUNDS, (err, hash) => {
        admin.password = hash;
        User.create(admin, (err, user) => {
          callback(null, 'Admin Created')
        }).then((user) => {
          return rp({
            method: 'POST',
            uri: `${baseUrl}/authenticate`,
            body: {
              email: user.email,
              password: originalPassword,
            },
            json: true, // Automatically parses the JSON string in the response
          }).then((data) => {
            fs.writeFile('scripts/token.txt', data.token, function(err) {
              if (err) {
                return console.log(err);
              }
              console.log("The file was saved!");
            });
          });
        });
      });
    },
  ],
  cb);
};


async.series([
  clearCases,
  clearVictims,
  clearUsers,
  clearSuspects,
  createAdministrator
],
// optional callback
function (err, results) {
  if (err) {
    // console.log('FINAL ERR: ' + err);
  } else {
    // console.log('Removed: ' + results);
  }
  // All done, disconnect from database
  mongoose.connection.close();
});
