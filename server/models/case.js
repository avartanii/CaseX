var mongoose = require('mongoose');
// var User = require('../models/user');
// var Victim = require('../models/victim');
// var Address = require('../models/address');
// var Suspect = require('../models/suspect');

var caseSchema = new mongoose.Schema({
  drNumber: {
    type: Number,
    required: true,
  },
  masterDrNumber: {
    type: Number,
    required: true,
  },
  division: {
    type: String,
    enum: ['Northwest', 'Northeast'],
    required: true,
  },
  bureau: {
    type: String,
  },
  // notes: {
  //   type: String,
  // },
  // dateOccured: {
  //   type: Date,
  // },
  // dateReported: {
  //   type: Date,
  // },
  // reportingDistrict: {
  //   type: String,
  //   enum: [],
  // },
  // caseStatus: {
  //   type: String,
  //   enum: [],
  // },
  // caseStatusDate: {
  //   type: Date,
  // },
  // solvabilityFactor: {
  //   type: String,
  //   enum: [],
  // },
  // weaponUsed: {
  //   type: String,
  // },
  // motive: {
  //   type: String,
  // },
  // lastModifiedDate: {
  //   type: Date,
  //   default: Date.now,
  // },
  //
  // lastModifiedBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  // victim: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Victim',
  // },
  // address: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Address',
  // },
  // suspects: {
  //   type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Suspect'}]
  // }
});

module.exports = mongoose.model('Case', caseSchema);
