#! /usr/bin/env node

/* eslint no-console: "off" */

console.log('This script clears Case, Victim, User, and Suspect data from MongoDB database.');
const env = process.env.NODE_ENV || 'development';

const mongoose = require('mongoose');
const config = require('../server/config/config')[env];
const async = require('async');
const Case = require('../server/models/case');
const Victim = require('../server/models/victim');
const User = require('../server/models/user');
const Suspect = require('../server/models/suspect');

console.log('Connecting to Mongo at %s', config.db);
mongoose.connect(config.db, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const clearCases = (cb) => {
  async.parallel(
    [
      (callback) => {
        Case.remove({}, () => {
          callback(null, 'Case Data');
        });
      },
    ],
    cb,
  );
};

const clearVictims = (cb) => {
  async.parallel(
    [
      (callback) => {
        Victim.remove({}, () => {
          callback(null, 'Victim Data');
        });
      },
    ],
    cb,
  );
};

const clearUsers = (cb) => {
  async.parallel(
    [
      (callback) => {
        User.remove({}, () => {
          callback(null, 'User Data');
        });
      },
    ],
    cb,
  );
};

const clearSuspects = (cb) => {
  async.parallel(
    [
      (callback) => {
        Suspect.remove({}, () => {
          callback(null, 'Suspect Data');
        });
      },
    ],
    cb,
  );
};

async.series(
  [
    clearCases,
    clearVictims,
    clearUsers,
    clearSuspects,
  ],
  (err, results) => {
    if (err) {
      console.log(`FINAL ERR: ${err}`);
    } else {
      console.log(`Removed: ${results}`);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  },
);
