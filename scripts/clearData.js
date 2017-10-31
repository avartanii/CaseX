#! /usr/bin/env node
console.log('This script clears Case, Victim, User, and Suspect data from MongoDB database.');

var async = require('async');
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var config = require('../server/config/config')[env];

var Case = require('../server/models/case');
var Victim = require('../server/models/victim');
var User = require('../server/models/user');
var Suspect = require('../server/models/suspect');

console.log('Connecting to Mongo at %s', config.db);
mongoose.connect(config.db, { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var clearCases = function (cb) {
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


async.series([
  clearCases,
  clearVictims,
  clearUsers,
  clearSuspects
],
// optional callback
function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err);
  } else {
    console.log('Removed: ' + results);
  }
  // All done, disconnect from database
  mongoose.connection.close();
});
