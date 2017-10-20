#! /usr/bin/env node
/* eslint-disable */
console.log('This script clears MongoDB database and loads sample data');

var async = require('async');
var Case = require('../server/models/case');
var Victim = require('../server/models/victim');
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var config = require('../server/config/config')[env];

console.log('Connecting to Mongo at %s', config.db);
mongoose.connect(config.db, { useMongoClient: true });
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var cases = [];

var caseData = [
  "123314234234|456|Southwest",
  "23412443242|234|Southwest"
]

function clearData(cb) {
  async.parallel([
    function (callback) {
      Case.remove({}, function () {callback(null, 'Case data cleared')});
    },
    function (callback) {
      Victim.remove({}, function () {callback(null, 'Victim data cleared')});
    }
  ],
  cb)
}

function loadSampleData(cb) {
  async.parallel([
    function (callback) {
      console.log("Loading Victim Data");
      setTimeout(function() { callback(null, 'complete victims') }, 7000);
    },
    function (callback) {
      console.log("Loading Suspect Data");
      setTimeout(function() { callback(null, 'complete suspects') }, 7000);
    },
    function (callback) {
      console.log("Loading Case Data");
      setTimeout(function() { callback(null, 'complete cases')}, 7000);
    }
  ],
  cb
)}


// function caseCreate(drNumber, masterDrNumber, division, cb) {
//   var casedetail = { drNumber: drNumber, masterDrNumber: masterDrNumber, division: division };
//   var newCase = new Case(casedetail);
//   newCase.save(function(err) {
//     if (err) {
//       cb(err, null)
//       return
//     }
//     console.log("New Case: " + newCase);
//     cases.push(newCase)
//     cb(null, newCase)
//   })
// }
//
// function createCases(cb) {
//   console.log('starting to create cases');
//   async.parallel([
//     function(callback) {
//       caseCreate('123314234234', '456', 'Southwest', callback);
//     },
//     function(callback) {
//       caseCreate('23412443242', '234', 'Southwest', callback);
//     },
//     ],
//   cb);
// }

async.series([
    clearData,
    loadSampleData
],

// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: ' + err);
    } else {
        console.log('Results: ' + results);
    }
    console.log("Disconnecting from database");
    //All done, disconnect from database
    mongoose.connection.close();
});
