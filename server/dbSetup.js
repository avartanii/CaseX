#! /usr/bin/env node
/* eslint-disable */
console.log('This script clears MongoDB database and populates it with test data');

var async = require('async');
var Case = require('./models/case');
var Victim = require('./models/victim');
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

console.log('Connecting to Mongo at %s', config.db);
mongoose.connect(config.db, { useMongoClient: true });
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var cases = [];

function caseCreate(drNumber, masterDrNumber, division, cb) {
  var casedetail = { drNumber: drNumber, masterDrNumber: masterDrNumber, division: division };
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
    function (callback) {
      console.log('removing case data');
      Case.remove({}, function () {callback(null, 'yay')});
    },
  ],
  cb);
}

function clearVictims(cb) {
  async.parallel([
    function (callback) {
      console.log('removing victim data');
      Victim.remove({}, function () {callback(null, 'yay')});
    },
  ],
  cb);
}

function createCases(cb) {
  console.log('starting to create cases');
  async.parallel([
    function(callback) {
      caseCreate('123314234234', '456', 'Southwest', callback);
    },
    function(callback) {
      caseCreate('23412443242', '234', 'Southwest', callback);
    },
    ],
  cb);
}

async.series([
    clearCases,
    clearVictims,
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
