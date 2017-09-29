#! /usr/bin/env node
/* eslint-disable */
console.log('This script clears MongoDB database and populates it with test data');

var async = require('async');
var Case = require('./models/case');
var mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

console.log('Connecting to Mongo at %s', config.db);
mongoose.connect(config.db, { useMongoClient: true });
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var cases = [];

function caseCreate(drNum, masterDrNum, division, cb) {
  var casedetail = { drNum, masterDrNum, division };
  var newCase = new Case(casedetail);
  newCase.save(function(err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log("New Case: " + newCase);
    cases.push(newCase)
    cb(null, newCase)
  })
}


function clearCases(cb) {
  async.parallel([
    (callback) => {
      console.log('removing case data');
      Case.remove({}, () => {callback(null, 'yay')});
      console.log('finished');
    },
  ],
  cb);
}

function createCases(cb) {
  console.log('starting to create cases');
  async.parallel([
    function(callback) {
      caseCreate('123314234234', '456', 'Northwest', callback);
    },
    function(callback) {
      caseCreate('23412443242', '234', 'Northwest', callback);
    },
    ],
  cb);
}

async.series([
    clearCases,
    createCases
],

// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('CaseInstances: '+ results);

    }
    //All done, disconnect from database
    mongoose.connection.close();
});
